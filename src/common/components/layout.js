import { Person, Group, HomeRounded, ChevronRightRounded, SearchOutlined, RocketLaunchOutlined, NotificationsOutlined, KeyboardArrowDownRounded } from "@mui/icons-material"

export const Layout = ({ children }) => {

    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="h-16 flex w-full py-3 px-6 justify-between sticky inset-0 bg-[#00004E]">
                <div className="flex w-full items-center space-x-3">
                    <p className="text-2xl font-bold text-white">kisi</p>

                    {/* search */}
                    <div className="lg:block hidden w-1/4">
                        <div className="border bg-white px-2 py-1 space-x-2 flex items-center justify-between rounded-md">
                            <div className="w-full flex items-center space-x-1">
                                <SearchOutlined />
                                <input type="text" className="outline-none w-full" />
                            </div>
                            <KeyboardArrowDownRounded fontSize="12" />
                        </div>
                    </div>
                </div>

                <div className="flex text-white text-xs items-center space-x-3">
                    <RocketLaunchOutlined fontSize="small" className="cursor-pointer" />
                    <NotificationsOutlined fontSize="small" className="cursor-pointer" />
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <p>testaccount@kisi.io</p>
                        <KeyboardArrowDownRounded fontSize="12" />
                    </div>
                </div>
            </div>
            <div className="grow flex overflow-x-hidden">
                <div className="hidden md:block w-1/6 flex-none h-full bg-white px-5 space-y-2 py-16">
                    {
                        menuItems.map((item, index) => (
                            <div className={`${item.title === 'Groups' && 'bg-blue-600 text-white'} flex px-4 py-2 duration-150 text-sm items-center space-x-3 text-gray-700 font-semibold cursor-pointer rounded-md`} key={index}>
                                {item.icon}
                                <p>{item.title}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="grow px-8 lg:px-64 py-8 bg-gray-100 overflow-hidden">
                    <div className="flex items-center space-x-1 text-sm">
                        <p className="underline text-blue-600 cursor-pointer">Home</p>
                        <ChevronRightRounded className="h-1 p-1" />
                        <p className="text-blue-600">Groups</p>
                    </div>
                    <div className="py-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

const menuItems = [
    { title: 'Home', icon: <HomeRounded /> },
    { title: 'Users', icon: <Person /> },
    { title: 'Groups', icon: <Group /> }
]