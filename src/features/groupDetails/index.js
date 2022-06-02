import { useEffect, useState, useRef, Fragment } from "react";
import { TextField, Button, LockCard, ShowToast } from "../../common/components"
import { useDispatch, useSelector } from "react-redux";
import { selectedGroup } from "../../redux/reducers/allReducer";
import { removeSelectedGroup } from "../../redux/actions/allActions";
import { Menu, Dialog, Transition } from '@headlessui/react'

import Kisi from "kisi-client"
import { useParams } from "react-router-dom";

const GroupDetails = () => {
    const { groupId } = useParams();

    const [groupLock, setGroupLock] = useState([])
    const [allLock, setLock] = useState([])
    const [filteredLocks, setFilteredLocks] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [selectedPlace, setSelectedPlace] = useState('')
    const [selectedLock, setselectedLock] = useState('')
    const [groupName, setGroupName] = useState('')
    const kisiClient = new Kisi()

    const [isOpen, setOpen] = useState(false);

    const search = e => {
        e.preventDefault()

        setSearchItem(e.target.value)
        const filtered = groupLock.filter(data => data.lock.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredLocks(filtered)
    }

    const addLock = e => {
        e.preventDefault()
        const kisiClient = new Kisi()

        setOpen(false)
        kisiClient.signIn({ domain: 'test-task', email: 'testaccount+1@kisi.io', password: 'uA3JlShxKn' }).then(() => {
            kisiClient.post('group_locks', {
                "group_lock": {
                    "group_id": groupId,
                    "lock_id": selectedLock
                }
            }).then((response) => {
                ShowToast('success', 'Lock Added')
                setGroupLock([...groupLock, response])
            })
        })
    }

    const removeLock = (lockId) => {
        kisiClient.signIn({ domain: 'test-task', email: 'testaccount+1@kisi.io', password: 'uA3JlShxKn' }).then((user) => {
            kisiClient.delete(`group_locks/${parseInt(lockId)}`).then((info) => {
                ShowToast('error', 'Lock Removed')
                const filteredGroup = groupLock.filter(data =>  data.id !== lockId)
                setGroupLock(filteredGroup)
            }, error => {
                console.log(`ERROR ${JSON.stringify(error)}`)
            })
        })
    }

    const fetchGroupDetails = async () => {

        kisiClient.signIn({ domain: 'test-task', email: 'testaccount+1@kisi.io', password: 'uA3JlShxKn' }).then(() => {
            kisiClient.get('locks').then((locks) => {
                setLock(locks['data'])
            }, error => {
                console.log(`ERROR ${JSON.stringify(error)}`)
            });

            kisiClient.get(`group_locks`, { group_id: groupId }).then((groupLocks) => {
                setGroupLock(groupLocks['data'])

            }, error => {
                console.log(`ERROR ${JSON.stringify(error)}`)
            })

            kisiClient.get(`groups`, { id: groupId }).then((group) => {
                setGroupName(group['data'][0]['name'])
            }, error => {
                console.log(`ERROR ${JSON.stringify(error)}`)
            })
        })
    };


    useEffect(() => {
        if (groupId && groupId !== "") fetchGroupDetails(groupId);
    }, [groupId])

    useEffect(() => {
        localStorage.setItem('groupId', JSON.stringify(groupId))
    })

    return (
        <>
            <div className="flex flex-col space-y-5 h-screen">
                <div className="flex-col">
                    <p className="font-semibold">{groupName}</p>
                    <p className="text-gray-500 text-xs">Add locks</p>
                </div>

                <div className="border rounded-md bg-white h-fit lg:h-fit shrink-0 p-5 space-y-8 overflow-y-auto">
                    <div className="lg:flex justify-between space-y-1 lg:space-y-0 items-center ">
                        <div className="lg:w-2/3">
                            <TextField showlabel="false" label='Search Locks' onChange={search} />
                        </div>
                        <div className="w-2/3 lg:w-1/5">
                            <Button onClick={() => setOpen(true)} label='Add Lock' issecondary="true" />
                        </div>
                    </div>

                    <div className="flex flex-col h-3/4 lg:h-5/6">
                        {
                            filteredLocks.length > 0
                                ? filteredLocks.map((item, index) => <LockCard item={item} removeLock={removeLock} key={index} />)
                                : !!groupLock && groupLock.map((item, index) => <LockCard item={item} removeLock={removeLock} key={index} />)
                        }
                    </div>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            New Lock
                                        </Dialog.Title>
                                        <form className="w-full space-y-4 py-6" onSubmit={addLock}>

                                            <label htmlFor="locks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select Lock</label>

                                            <select id="locks" onChange={e => setselectedLock(e.target.value)}
                                                value={selectedLock}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option>Choose...</option>
                                                {
                                                    allLock.map((item, index) => (
                                                        <option key={index} value={item['id']}>{item['name']}</option>
                                                    ))
                                                }

                                            </select>
                                            <div className="flex mt-4 space-x-4 float-right">
                                                <button
                                                    type="button"
                                                    onClick={() => { setOpen(false) }}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    Add
                                                </button>

                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>


        </>
    )
}

export default GroupDetails