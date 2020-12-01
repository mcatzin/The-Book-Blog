import axios from 'axios';
import { 
    BOOK_ADD,
    BOOK_CLEAR,
    BOOK_GET,
    BOOK_UPDATE,
    BOOKS_GET,
} from '../types'

export function getBooks(
  limit=50,
  start=0,
  order='asc',
  list
) {
  const request = axios.get(`/api/books/all_books?limit=${limit}&skip=${start}&order=${order}`)
                  .then((response) => {
                    return list ? [...list, ...response.data] : response.data
                  });

  return {
    type:BOOKS_GET,
    payload: request
  }
}
export function editBook(book){
  // /api/books/book
  const request = axios.patch('/api/books/book',book)
                   .then( response => response.data )

  return {
   type: BOOK_UPDATE,
   payload: request    
   }
}


export function getBook(bookId){
  //  /api/books/book?id=5e13765a4084511885f252f1
  const request = axios.get(`/api/books/book?id=${bookId}`)
               .then( res => {
                   return res.data
               }).catch((err)=>{
                   return false
               })

   return {
       type: BOOK_GET,
       payload: request
   }

}

export function addBook(book){
  const request = axios.post('/api/books/book', book)
                  .then( res => res.data )

  return {
      type: BOOK_ADD,
      payload: request
  }
}
export function clearBook(book){
  return {
      type:BOOK_CLEAR,
      payload: null
  }
}