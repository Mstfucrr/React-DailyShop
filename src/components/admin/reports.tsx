import { SET_TOAST } from '@/store/Toast';
import { IToast } from '@/store/Toast/type';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import to from 'await-to-js';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/store/auth';
import { useState, useEffect, useRef } from 'react';
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

const Reports = () => {
    const dispatch = useDispatch();
    const { token, auth } = useSelector(authSelector);
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
        const [err, data] = await to(reportsService.getReportedUsers(token));
        setReportedUserLoading(false);
        if (err) {
            msgsRepUser.current?.clear();
            msgsRepUser.current?.show([
                { sticky: true, severity: 'error', summary: 'Sistematik Hata', detail: err.message, closable: false, icon: 'pi pi-exclamation-triangle' }
            ]);
            return;
        }
        if (data.data.length === 0) {
            msgsRepUser.current?.clear();
            msgsRepUser.current?.show([
                { sticky: true, severity: 'info', summary: 'Raporlanan Kullanıcı Bulunamadı', detail: 'Raporlanan kullanıcı bulunamadı.', closable: false, icon: 'pi pi-info-circle' }
            ]);
        }
        else {
            msgsRepUser.current?.clear();
            setReportedUsers(data.data);
        }

    }

    const fetchReportedReviews = async () => {
        setReportedReviewLoading(true);
        const [err, data] = await to(reportsService.getReportedReviews(token));
        setReportedReviewLoading(false);
        if (err) {
            msgsRepReview.current?.clear();
            msgsRepReview.current?.show([
                { sticky: true, severity: 'error', summary: 'Sistematik Hata', detail: err.message, closable: false, icon: 'pi pi-exclamation-triangle' }
            ]);
            return;
        }
        if (data.data.length === 0) {
            msgsRepReview.current?.clear();
            msgsRepReview.current?.show([
                { sticky: true, severity: 'info', summary: 'Raporlanan Yorum Bulunamadı', detail: 'Raporlanan yorum bulunamadı.', closable: false, icon: 'pi pi-info-circle' }
            ]);
        }
        else {
            msgsRepReview.current?.clear();
            setReportedReviews(data.data);
        }
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

    const reportedUserss: IReportedUsers[] = [
        {
            id: 1,
            user: auth,
            reporterUser: auth,
            reportedDate: "2023-01-01",
            reportedMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus fuga non cum consectetur aperiam deserunt eaque sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at."
        },
        {
            id: 2,
            user: auth,
            reporterUser: auth,
            reportedDate: "2022-01-01",
            reportedMessage: "Lorem ipsum dolor sit  recusandae accusantium at."
        },
        {
            id: 3,
            user: auth,
            reporterUser: auth,
            reportedDate: "2021-01-01",
            reportedMessage: "Lorem ipsum dolor sit amet, consectetur   accusantium at."
        }

    ]

    const reportedReviewss: any[] = [
        {
            id: 1,
            reporterUser: auth,
            reportedDate: "2023-01-01",
            reportedMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus fuga non cum consectetur aperiam deserunt eaque sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
            review: {
                user: auth,
                comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus fuga non cum consectetur aperiam deserunt eaque sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
                status: "New"
            }
        },
        {
            id: 2,
            reporterUser: auth,
            reportedDate: "2022-01-01",
            reportedMessage: "Lorem ipsum dolor sit  recusandae accusantium at.",
            review: {
                user: auth,
                comment: "Lorem ipsum dolor sit amet,  sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
                status: "reject"
            }
        },
        {
            id: 3,
            reporterUser: auth,
            reportedDate: "2021-01-01",
            reportedMessage: "Lorem ipsum dolor sit amet, consectetur   accusantium at.",
            review: {
                user: auth,
                comment: "itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
                status: "approved"
            }
        }

    ]

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


    const renderCardFooterForReview = (review: IReview) => {
        return (
            // engelle , raporu sil

            <div className="flex gap-5 flex-row justify-between">
                {renderStatusDropdown(review)}
                <Button label="Raporu Sil" severity='help' onClick={() => handleDeleteReportForReview(review.id)} />
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
                    <strong>Rapor Tarihi:</strong><br /> {reportedItem.reportedDate}
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
        <Card key={reportedItem.review.id} footer={renderCardFooterForReview(reportedItem.review)}
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
                    <strong>Rapor Tarihi:</strong><br /> {reportedItem.reportedDate}
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
                        <div className="flex flex-wrap gap-4 w-full max-h-96 overflow-y-auto">
                            {/* {msgsRepUser && <Messages ref={msgsRepUser} className="w-1/2 ml-24" />} */}
                            {reportedUserss.map((repUser) => (
                                <div key={"reportedUser-" + repUser.id}>
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
                        <div className="flex flex-wrap gap-4 w-full max-h-96 overflow-y-auto">
                            {/* {msgsRepReview && <Messages ref={msgsRepReview} className="w-1/2 ml-24" />} */}
                            {reportedReviewss.map((repReview) => (
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
