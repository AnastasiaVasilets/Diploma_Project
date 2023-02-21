import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../App.module.css';

import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import Card from '../../components/menu/card/index';
import Categories from '../../components/tools/categories/index';
import SortPopup, { list } from '../../components/tools/sort/index';
import Skeleton from '../../components/menu/card/skeleton';
import Pagination from '../../components/pagination';
import { fetchDishes, SearchDishParams, selectDishInfo } from '../../redux/slices/dishesSlice';
import { useAppDispatch } from '../../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isSearch = React.useRef(false);
  const isMounted = React.useRef(false); //изначально первый рендер false
  
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const {items, status} = useSelector(selectDishInfo);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  const onClickCategory = (i: number) => {
    dispatch(setCategoryId(i))
  }

  const getDishes = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : '';
    
    dispatch(
      fetchDishes({
        sortBy,
        order,
        category, 
        search,
        currentPage: String(currentPage)
    }),
    )   
    window.scrollTo(0, 0)
  }

  //если параметры были изменены и первый рендер уже был, то тогда запрашиваем параметры для адресной строчки
  React.useEffect(() => {
    if(isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage
      }
      const queryString = qs.stringify(params, { skipNulls: true })
  
      navigate(`/?${queryString}`)
    }

//     if (!window.location.search) {
//       dispatch(fetchDishes({} as SearchDishParams))
//     }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

//Проверка первого рендера. Если он был, то идет проверка URL-параметров и сохранение
  React.useEffect(() => {
      getDishes()
    
  }, [categoryId, sort.sortProperty, searchValue, currentPage])


  //если первый рендер, то запрашиваем блюда
  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchDishParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
    dispatch(setFilters({
      searchValue: params.search,
      categoryId: Number(params.category),
      currentPage: Number(params.currentPage),
      sort: sort || list[0]
    }));
  }
  isMounted.current = true;
}, []);


  //получаем данные из массива и прикручиваем их к соответствующим полям
  const dishes =  items.map((obj: any) => 
    <Card
    key={obj.id}
    id={obj.id}
    title={obj.title} 
    price={obj.price} 
    img={obj.img}
    souce={obj.souce}
    type={obj.types}/>
  );


  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (<>
          <div className={styles.content__top}>
            <Categories value = {categoryId} onClickCategory = {onClickCategory}/>
            <SortPopup />
          </div>
          <h2 className={styles.content__title}>Our dishes</h2>
          <div className={styles.content__items}>
            {status === 'loading' ? skeletons : dishes}
          </div>
          <Pagination currentPage = {currentPage} onChangePage = {onChangePage}/>
          </>
  );
}

export default Home;
