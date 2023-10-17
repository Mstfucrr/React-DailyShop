import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import Settings from './settings';
import UserSettings from './users';

enum AdminPage {
    Settings = 'settings',
    Products = 'products',
    Users = 'users',
}

const Admin: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<AdminPage>(AdminPage.Settings);

    const items: MenuItem[] = [
        {
            label: 'Site Ayarları',
            icon: 'pi pi-fw pi-home',
            command: () => setSelectedPage(AdminPage.Settings),

        },
        {
            label: 'Kullanıcı Ayarları',
            icon: 'pi pi-fw pi-users',
            command: () => setSelectedPage(AdminPage.Users),
        },
        {
            label: 'Ürün Ayarları',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => setSelectedPage(AdminPage.Products),

        },
    ];


    return (
        <div className="flex h-auto flex-col pt-10 w-5/6 mx-auto">

            <div className="flex flex-wrap justify-between gap-5 py-7">

                <a href="/" className=" text-black">
                    {/* font-size: calc(1.375rem + 1.5vw); */}
                    <h1 className="m-0 text-4xl font-semibold" style={{ fontSize: 'calc(1.375rem + 1.5vw)' }}>
                        <span className="text-primary font-bold border px-4 mr-1">D</span>
                        ailyShop
                    </h1>
                </a>

                {/* Hoşgeldin */}
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
                <div className="md:w-1/5 w-full ">
                    <Menubar model={items} className='w-full'
                        pt={{
                            menuitem: {
                                className: "text-xl w-full text-center"
                            }
                        }}
                    />

                </div>
                <div className="flex w-full md:w-4/5 pl-6">
                    {/* Content goes here */}
                    {/* url path global router güncellemesi aynı sayfada farklı componentler gelecek */}

                    {selectedPage === AdminPage.Settings && <Settings />}
                    {selectedPage === AdminPage.Users && <UserSettings />}
                    {selectedPage === AdminPage.Products && <div>Products</div>}

                </div>
            </div>
        </div>
    );
};

export default Admin;
