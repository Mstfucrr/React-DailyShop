import { SET_TOAST } from '@/store/Toast';
import { IToast } from '@/store/Toast/type';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import to from 'await-to-js';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/store/auth';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Fieldset } from "primereact/fieldset"
import reportsService, { IReportedReviews, IReportedUsers } from '@/services/admin/reports.service';
import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { userService } from '@/services/admin/admin.service';
import { IUser } from '@/services/auth/types';
import { IReview } from '@/shared/types';
import { Dropdown } from 'primereact/dropdown';
import { reviewStatus } from '@/shared/constants';
import { motion } from 'framer-motion';

const Reports = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(authSelector);
    const [reportedUserLoading, setReportedUserLoading] = useState<boolean>(false);
    const [reportedUsers, setReportedUsers] = useState<IReportedUsers[]>([]);
    const [reportedReviewLoading, setReportedReviewLoading] = useState<boolean>(false);
    const [reportedReviews, setReportedReviews] = useState<IReportedReviews[]>([]);
    const msgsRepUser = useRef<Messages>(null);
    const msgsRepReview = useRef<Messages>(null);

    const showErrorMessage = (err: Error) => {
        const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }
    const showSuccess = (message: string) => {
        const toast: IToast = { severity: 'success', summary: "Başarılı", detail: message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }

    const fetchReportedUsers = async () => {
        setReportedUserLoading(true);
        msgsRepUser.current?.clear(); // Clear previous messages

        const [err, data] = await to(reportsService.getReportedUsers(token));
        if (err) {
            msgsRepUser.current?.show([
                { sticky: true, severity: 'error', summary: 'Sistematik Hata', detail: err.message, closable: false, icon: 'pi pi-exclamation-triangle' }
            ]);
            setReportedUserLoading(false);

            return;
        }
        if (data.data.length === 0) {
            msgsRepUser.current?.clear();
            msgsRepUser.current?.show([
                { sticky: true, severity: 'info', summary: 'Raporlanan Kullanıcı Bulunamadı', detail: 'Raporlanan kullanıcı bulunamadı.', closable: false, icon: 'pi pi-info-circle' }
            ]);
            setReportedUsers([]);
        }
        else {
            setReportedUsers(data.data);
        }
        setReportedUserLoading(false);


    }

    const fetchReportedReviews = async () => {
        setReportedReviewLoading(true);
        msgsRepReview.current?.clear(); // Clear previous messages
        const [err, data] = await to(reportsService.getReportedReviews(token));
        if (err) {
            msgsRepReview.current?.show([
                { sticky: true, severity: 'error', summary: 'Sistematik Hata', detail: err.message, closable: false, icon: 'pi pi-exclamation-triangle' }
            ]);
            setReportedReviewLoading(false);

            return;
        }
        if (data.data.length === 0) {
            msgsRepReview.current?.clear();
            msgsRepReview.current?.show([
                { sticky: true, severity: 'info', summary: 'Raporlanan Yorum Bulunamadı', detail: 'Raporlanan yorum bulunamadı.', closable: false, icon: 'pi pi-info-circle' }
            ]);
            setReportedReviews([]);
        }
        else {
            setReportedReviews(data.data);
        }
        setReportedReviewLoading(false);

    }

    const handleDeleteReportForUser = async (reportId: number) => {
        const [err, data] = await to(reportsService.deleteReportForUser(reportId, token));
        if (err) return showErrorMessage(err);
        showSuccess(data.message);
        fetchReportedUsers();
    }

    const handleDeleteReportForReview = async (reportId: number) => {
        const [err, data] = await to(reportsService.deleteReportForReview(reportId, token));
        if (err) return showErrorMessage(err);
        showSuccess(data.message);
        fetchReportedReviews();
    }

    useEffect(() => {
        fetchReportedUsers();
        fetchReportedReviews();
    }, []);

    const renderCardFooterForUser = (user: IUser, reportId: number) => {
        return (
            <div className="flex gap-5 flex-row justify-between">
                {user.status ? (
                    <Button onClick={() => { handleBlockUser(user.id); }} icon="pi pi-ban" className="p-button-danger p-button-outlined" label="Engelle" size='small' />
                ) : (
                    <Button onClick={() => { handleBlockUser(user.id); }} icon="pi pi-check" className="p-button-success p-button-outlined" label="Engeli kaldır" size='small' />
                )}
                <Button label="Raporu Sil" severity='help'
                    onClick={() => handleDeleteReportForUser(reportId)}
                />
            </div>
        );
    }

    const handleBlockUser = async (id: number) => {
        const [err, data] = await to(userService.blockUser(id, token))
        if (err) return showErrorMessage(err)
        showSuccess(data.message)
    }


    const handleReviewStatusChange = async (data: IReview, status: string) => {
        const [err, data2] = await to(userService.updateReviewStatus(data.id, status, token))
        if (err) return showErrorMessage(err)
        showSuccess(data2.message)
    }

    const renderStatusDropdown = ((data: IReview) => (
        <Dropdown
            options={reviewStatus}
            value={data.status ?? 'New'}
            onChange={(e) => {
                handleReviewStatusChange(data, e.value)
            }}
        />
    ))


    const renderCardFooterForReview = (review: IReview, reportId: number) => {
        return (
            // engelle , raporu sil

            <div className="flex gap-5 flex-row justify-between">
                {renderStatusDropdown(review)}
                <Button label="Raporu Sil" severity='help' onClick={() => handleDeleteReportForReview(reportId)} />
            </div>
        );
    }



    const renderRepUserPanel = (user: IUser) => {
        return (
            <div className="flex flex-row flex-wrap gap-3">
                <Avatar image={user.profileImage} size='large' shape='circle' className="mr-3 mt-2" />
                <div className="flex flex-wrap">
                    <span> {user.name + " " + user.surname + " (" + user.email + ") "}</span>
                    <a href={`http://localhost:5173/admin/users?userId=${user.id}`} target="_blank" className="text-blue-500">Kullanıcıyı Görüntüle</a>
                </div>
            </div>
        )
    }


    const refreshButton = useCallback((refreshFunction: () => Promise<void>) => (
        <motion.div className="flex justify-end my-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.4 }}
        >
            <Button label="Yenile" icon="pi pi-refresh" rounded raised text className='!bg-white' onClick={refreshFunction} />
        </motion.div>
    ), [reportedReviews, reportedUsers]);

    const renderReportedUsersCard = (reportedItem: IReportedUsers) => (
        <Card key={reportedItem.id} footer={renderCardFooterForUser(reportedItem.user, reportedItem.id)}
            pt={{
                body: { className: 'bg-[#fff6f6] w-full' },
            }}
            className='w-full flex'
        >
            <div className="flex flex-row w-full flex-wrap">

                {/* rapor eden kullanıcı */}
                <div className='max-w-[400px]'>
                    <strong>Rapor Eden Kullanıcı:</strong>
                    <br />
                    <div className="flex flex-row flex-wrap gap-3">
                        {renderRepUserPanel(reportedItem.reporterUser)}
                    </div>
                </div>

                {/* raporlanan kullanıcı */}
                <div className='max-w-[400px]'>
                    <strong>Raporlanan Kullanıcı:</strong>
                    <br />
                    <div className="flex flex-row flex-wrap gap-3">
                        {renderRepUserPanel(reportedItem.user)}
                    </div>
                </div>

                {/* rapor tarihi */}
                <div>
                    <strong>Rapor Tarihi:</strong><br /> {reportedItem.createdAt?.toString().split('T')[0]}
                </div>

                {/* rapor mesajı */}
                <div className='w-full mt-2'>
                    <strong>Rapor Mesajı:</strong><br /> {reportedItem.reportedMessage}
                </div>
            </div>

            {/* Daha fazla bilgi ekleyebilirsiniz */}
        </Card>
    );


    const renderReportedReviewsCard = (reportedItem: IReportedReviews) => (
        <Card key={reportedItem.review.id} footer={renderCardFooterForReview(reportedItem.review, reportedItem.id)}
            pt={{
                body: { className: 'bg-[#f4f4ff] w-full' },
            }}
            className='w-full flex'
        >
            <div className="flex flex-row w-full flex-wrap">

                {/* rapor eden kullanıcı */}
                <div className='max-w-[400px]'>
                    <strong>Rapor Eden Kullanıcı:</strong>
                    <br />
                    <div className="flex flex-row flex-wrap gap-3">
                        {renderRepUserPanel(reportedItem.reporterUser)}
                    </div>
                </div>

                {/* raporlanan kullanıcı */}
                <div className='max-w-[400px]'>
                    <strong>Raporlanan Kullanıcı:</strong>
                    <br />
                    <div className="flex flex-row flex-wrap gap-3">
                        {renderRepUserPanel(reportedItem.review.user as IUser)}
                    </div>
                </div>

                {/* rapor tarihi */}
                <div>
                    <strong>Rapor Tarihi:</strong><br /> {reportedItem.createdAt?.toString().split('T')[0]}
                </div>

                {/* rapor mesajı */}
                <div className='w-full mt-2'>
                    <strong>Rapor Mesajı:</strong><br /> {reportedItem.reportedMessage}
                </div>

                {/* yorum */}
                <div className='w-full mt-2'>
                    <strong>Yorum:</strong><br /> {reportedItem.review.comment}
                </div>
            </div>

            {/* Daha fazla bilgi ekleyebilirsiniz */}
        </Card>
    );

    // Render admin data
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="col-span-1">
                <Fieldset legend="Raporlanan Kullanıcılar" toggleable={true}>

                    {reportedUserLoading ? <ProgressSpinner /> :
                        <div className="flex flex-wrap gap-4 w-full max-h-[30rem] overflow-y-auto">
                            <div className="w-full flex justify-end pr-10 bg-transparent z-20 sticky top-0">
                                {refreshButton(fetchReportedUsers)}
                            </div>
                            {msgsRepUser && <Messages ref={msgsRepUser} className="w-1/2 ml-24" />}
                            {reportedUsers.map((repUser) => (
                                <div key={"reportedUser-" + repUser.id} className='min-w-full'>
                                    {renderReportedUsersCard(repUser)}
                                </div>
                            ))}
                        </div>
                    }
                </Fieldset>
            </div>
            <div className="col-span-1">
                <Fieldset legend="Raporlanan Yorumlar" toggleable={true}>
                    {reportedReviewLoading ? <ProgressSpinner /> :
                        <div className="flex flex-wrap gap-4 w-full max-h-[30rem] overflow-y-auto">
                            <div className="w-full flex justify-end pr-10 bg-transparent z-20 sticky top-0">
                                {refreshButton(fetchReportedReviews)}
                            </div>
                            {msgsRepReview && <Messages ref={msgsRepReview} className="w-1/2 ml-24" />}
                            {reportedReviews.map((repReview) => (
                                <div key={"reportedReview-" + repReview.review.id}>
                                    {renderReportedReviewsCard(repReview)}
                                </div>
                            ))}
                        </div>
                    }
                </Fieldset>
            </div>
        </div>
    );
}

export default Reports;
