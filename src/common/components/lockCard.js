import { Group, DeleteOutline } from "@mui/icons-material"

export const LockCard = ({ item, removeLock }) => {
    return (
        <div className="grid shrink-0 grid-cols-3 space-y-4 lg:space-y-0 lg:grid-cols-5 gap-x-8 px-4 py-3 rounded-md cursor-pointer group hover:bg-gray-100">
            <div className="col-span-4 flex items-center space-x-3">
                <div className="bg-gray-100 p-1 rounded">
                    <Group className="text-gray-400" />
                </div>
                <div className="flex flex-col">
                    <p>{item.lock.name}</p>
                    <p className="text-xs text-gray-500">{item.lock.description}</p>
                </div>
            </div>

            <div className="col-span-1 flex text-gray-500 justify-around items-center">
                <DeleteOutline fontSize="small"  onClick={() => removeLock(item.id)}/>
            </div>
        </div>
    )
}