import React, { useEffect, useState } from 'react'
import { TextInput, Button, Select } from 'flowbite-react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import PostCard from '../Component/PostCard'


const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'Uncategorized',
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLaoding] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm') || '';
        const sortFromUrl = urlParams.get('sort') || 'desc';
        const categoryFromUrl = urlParams.get('category') || 'Uncategorized';

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSideBarData({
                ...setSideBarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            });
        }
        fetchPosts(urlParams);
    }, [location.search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        if (sidebarData.category && sidebarData.category !== 'Uncategorized') {
            urlParams.set('category', sidebarData.category);
        } else {
            urlParams.delete('category');
        }
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const fetchPosts = async (urlParams) => {
        setLaoding(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
            console.log(res);
            setLaoding(false);
            return;
        }
        if (res.ok) {
            const data = await res.json();
            console.log(res);
            setPosts(data.posts);
            setLaoding(false);
            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false)
            }
        }
    }

    const handleSidebarSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        if (sidebarData.category && sidebarData.category !== 'Uncategorized') {
            urlParams.set('category', sidebarData.category);
        } else {
            urlParams.delete('category');
        }
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSideBarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSideBarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
            const category = e.target.value || 'Uncategorized';
            setSideBarData({ ...sidebarData, category });
        }
    };
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        // const urlParams = new
    }

    return (
        <>
            <div className='min-h-screen'>
                <div className='flex justify-center items-center border-b border-gray-500'>
                    <div className='flex my-6'>
                        <form onSubmit={handleSubmit} className='flex flex-nowrap'>
                            <TextInput id="searchany" type="search" placeholder="Search for Posts" required className='w-80'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                            <Button type='submit' className=''>
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="main flex flex-col md:flex-row">
                    <div className="sidebar p-7 border-b md:border-r md:min-h-screen border-gray-500">
                        <div className='flex flex-col gap-8' >

                            <form onSubmit={handleSidebarSubmit} className='flex md:flex-col sm:flex-row flex-wrap items-center gap-8'>
                                <div className='flex items-center gap-2'>
                                    <label className='whitespace-nowrap font-semibold'>Search Term: </label>
                                    <TextInput placeholder='Search...' id='searchTerm' type='text' value={sidebarData.searchTerm}
                                        onChange={handleChange}/>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className='font-semibold' >Sort :</label>
                                    <Select onChange={handleChange} value={sidebarData.sort}
                                        id='sort'
                                    >
                                        <option value="desc">Latest</option>
                                        <option value="asc">Oldest</option>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className='font-semibold' >Category :</label>
                                    <Select onChange={handleChange} value={sidebarData.category || 'Uncategorized'}
                                        id='category'
                                    >
                                        <option value="Uncategorized">Uncategorized</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Business">Business</option>
                                        <option value="Food">Food</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Health">Health</option>
                                        <option value="BookReview">BookReview</option>
                                        <option value="Educational">Educational</option>

                                    </Select>
                                </div>
                                <Button type='submit' outline gradientDuoTone='purpleToPink' className='w-full'>
                                    Apply Filters
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="w-full">
                        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts Results</h1>

                        <div className='p-7 flex flex-wrap gap-4'>
                            {
                                !loading && posts.length === 0 &&
                                <p className='text-xl text-gray-700'>
                                    No Posts Found
                                </p>
                            }
                            {
                                loading &&
                                <p className='text-xl text-gray-500'>
                                    Loading...
                                </p>
                            }
                            {
                                !loading && posts && posts.map((post) => <PostCard key={post._id} post={post} />)
                            }
                            {
                                showMore &&
                                <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>
                                    Show More
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPage
