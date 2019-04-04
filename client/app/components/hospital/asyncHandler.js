import $ from 'jquery';

export default function asyncHandler(url, methodType, data = {}) {
    const promiseObj = new Promise((resolve, reject) => {
      $.ajax({
        type: methodType,
        url,
        data,
        success: (results) => {
          resolve(results);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  
    return promiseObj;
  }
  