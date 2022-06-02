import { Group, GroupsOutlined, LocationOnOutlined, NoMeetingRoomOutlined, SensorDoorOutlined, WatchLaterOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom";

export const ItemCard = ({ item }) => {
    return (
        <Link to={`/group/${item.id}`}>
            <div className="grid shrink-0 grid-cols-3 space-y-4 lg:space-y-0 lg:grid-cols-5 gap-x-8 px-4 py-3 rounded-md cursor-pointer group hover:bg-gray-100">
                <div className="col-span-4 flex items-center space-x-3">
                    <div className="bg-gray-100 p-1 rounded">
                        <Group className="text-gray-400" />
                    </div>
                    <div className="flex flex-col">
                        <p>{item.name}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                </div>

                <div className="col-span-1 flex text-gray-500 font-semibold justify-around text-xs items-center">
                    {item.locksCount < 1 ?
                        <>
                            <SensorDoorOutlined className='text-red-500' fontSize="small" />
                            <p className='text-red-500'>{item.locksCount}</p>
                        </> :
                        <>
                            <SensorDoorOutlined fontSize="small" />
                            <p>{item.locksCount}</p>
                        </>
                    }


                    {item.membersCount < 1 ?
                        <>
                            <GroupsOutlined className='text-red-500' fontSize="small" />
                            <p className='text-red-500'>{item.membersCount}</p>
                        </> :
                        <>
                            <GroupsOutlined fontSize="small" />
                            <p>{item.membersCount}</p>
                        </>
                    }


                </div>
            </div>
        </Link>
    )
}