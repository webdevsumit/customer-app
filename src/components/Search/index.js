import React, { } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedText } from '../../redux/navbar';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const storeId = localStorage.getItem("storeId");

function Search() {

    const dispatch = useDispatch();
    const { searchedText } = useSelector(store => store.navbar);
    const naviegate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if(!!searchedText){
            naviegate(`/${storeId}/search/list`)
        }else toast.error("Search box is empty.")
    }

    return (
        <form className='Search' onSubmit={onSubmit}>
            <input
                className='Search-search'
                placeholder='search'
                type='search'
                value={searchedText}
                spellCheck="true"
                autoCorrect="true"
                onChange={e => dispatch(setSearchedText(e.target.value))}
            />
        </form>
    )
}

export default Search