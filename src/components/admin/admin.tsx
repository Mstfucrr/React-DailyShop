import React, { useEffect, useState } from 'react';
import Settings from './settings';
import UserSettings from './users';
import ProductSettings from './ProductSettings';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Reports from './reports';

enum AdminPage {
    Settings = 'settings',
    Products = 'products',
    Users = 'users',
    Reports = 'reports',
}

const Admin: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<AdminPage>(AdminPage.Settings);

    const navigate = useNavigate()

    useEffect(() => {
        switch (window.location.pathname) {
            case '/admin/settings':
                setSelectedPage(AdminPage.Settings);
                break;
            case '/admin/users':
                setSelectedPage(AdminPage.Users);
                break;
            case '/admin/products':
                setSelectedPage(AdminPage.Products);
                break;
            case '/admin/reports':
                setSelectedPage(AdminPage.Reports);
                break;
            default:
                setSelectedPage(AdminPage.Settings);
                break;
        }

    }, []);

    const items = [
        {
            label: 'Site Ayarları',
            icon: 'pi pi-fw pi-home',
            command: () => {
                setSelectedPage(AdminPage.Settings);
                navigate('/admin/settings'); // Navigate to /admin/settings
            },
            className: `${selectedPage === AdminPage.Settings ? '!bg-primary' : ''}`,
        },
        {
            label: 'Kullanıcı Ayarları',
            icon: 'pi pi-fw pi-users',
            command: () => {
                setSelectedPage(AdminPage.Users);
                navigate('/admin/users'); // Navigate to /admin/users
            },
            className: `${selectedPage === AdminPage.Users ? '!bg-primary' : ''}`,
        },
        {
            label: 'Ürün Ayarları',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                setSelectedPage(AdminPage.Products);
                navigate('/admin/products'); // Navigate to /admin/products
            },
            className: `${selectedPage === AdminPage.Products ? '!bg-primary' : ''}`,
        },
        {
            label: 'Raporlar',
            icon: 'pi pi-fw pi-chart-bar',
            command: () => {
                setSelectedPage(AdminPage.Reports);
                navigate('/admin/reports'); // Navigate to /admin/reports
            },
            className: `${selectedPage === AdminPage.Reports ? '!bg-primary' : ''}`,
        },
    ];


    return (
        <div className="flex h-auto flex-col pt-10 w-5/6 mx-auto">

            <div className="flex flex-wrap justify-between gap-5 py-7">

                <a href="/" className=" text-black">
                    <div className="m-0 text-4xl font-semibold" style={{ fontSize: 'calc(1.375rem + 1.5vw)' }}>
                        <span className="text-primary font-bold border px-4 mr-1">D</span>
                        {`ailyShop`}
                    </div>
                </a>

                <div className="flex justify-end items-center">
                    <div className="flex flex-col">
                        <span className="text-xl font-semibold">Hoşgeldin</span>
                        <span className="text-primary font-bold">Admin</span>
                    </div>
                    <div className="flex justify-center items-center w-12 h-12 bg-primary rounded-full ml-4">
                        <i className="pi pi-user text-white text-2xl"></i>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-full flex-wrap gap-y-6">
                <div className="md:w-1/5 w-full gap-3 flex flex-col">
                    {items.map((item) => (
                        <Button
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            className={item.className}
                            onClick={item.command}
                            severity="secondary"
                        />
                    ))}

                </div>
                <div className="flex w-full md:w-4/5 pl-6">
                    {selectedPage === AdminPage.Settings && <Settings />}
                    {selectedPage === AdminPage.Users && <UserSettings />}
                    {selectedPage === AdminPage.Products && <ProductSettings />}
                    {selectedPage === AdminPage.Reports && <Reports />}

                </div>
            </div>
        </div>
    );
};

export default Admin;
