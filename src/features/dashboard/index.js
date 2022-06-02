import { useEffect, useState } from "react";
import { TextField, Button, ItemCard } from "../../common/components"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import ReactPaginate from "react-paginate";
import Kisi from "kisi-client"
import { setGroups } from "../../redux/actions/allActions";

const Dashboard = () => {
    const groups = useSelector((state) => state.allGroups.groups);
    const user = useSelector((state) => state.userInfo.user);

    const fakeAuth = sessionStorage.getItem('qqrv')
    const [searchItem, setSearchItem] = useState('')
    const [filteredGroup, setFilteredGroups] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const dispatch = useDispatch()

    const groupsPerPage = 5
    const pagesVisited = pageNumber * groupsPerPage

    const search = e => {
        e.preventDefault()

        setSearchItem(e.target.value)
        const filtered = groups.filter(data => data.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredGroups(filtered)
    }

    const loadGroups = () => {
        const kisiClient = new Kisi()

        kisiClient.signIn({ domain: 'test-task', email: user.email, password: user.password }).then((info) => {
            kisiClient.get("groups").then((groups) => {
                dispatch(setGroups(groups['data']));
            });
        })

    }
    useEffect(() => {
        if (user == undefined) {
            <Navigate to='/login' />
        }
        loadGroups()
    }, [])

    const displayGroups = !!groups && groups.slice(pagesVisited, pagesVisited + groupsPerPage).map((item, index) => { return <ItemCard item={item} key={index} /> })
    const pageCount = !!groups && Math.ceil(groups.length / groupsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="flex flex-col space-y-5 h-screen">
            <div className="flex-col">
                <p className="font-semibold">Groups <span className="text-gray-500">{!!groups && groups.length}</span></p>
                <p className="text-gray-500 text-xs">Add users to groups and assign different access rights</p>
            </div>

            <div className="border rounded-md bg-white h-fit lg:h-fit shrink-0 p-5 space-y-8">
                <div className="lg:flex justify-between space-y-1 lg:space-y-0 items-center">
                    <div className="lg:w-2/3">
                        <TextField showlabel="false" label='Search Groups' onChange={search} />
                    </div>
                </div>

                <div className="flex flex-col h-3/4 lg:h-5/6">
                    {
                        searchItem == "" ?
                            !!groups && displayGroups
                            : filteredGroup.length > 0
                                ? filteredGroup.map((item, index) => <ItemCard item={item} key={index} />)
                                : !!groups && displayGroups
                    }
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard