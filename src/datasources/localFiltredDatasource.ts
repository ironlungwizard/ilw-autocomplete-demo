export default function dataSource(url: string) {
  var data: string[] = [];
  var loadPromise = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", url, true);
    console.log("запрос прошёл");
    xhr.onload = function () {
      if (this.status == 200) {
        data = this.response;
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        reject(error);
      }
    };
    xhr.onerror = function () {
      reject(new Error("Ошибка сети"));
    };
    xhr.send();
  });
  return function dataSourceInner(value: string, timeStamp: Date) {
    var promise = new Promise(function (resolve) {
      loadPromise.then(function () {
        resolve({
          timeStamp: timeStamp,
          data: sortAndFilter(data, value.split(" ")),
        });
      });
    });
    return promise;
  };
}

function getMatchMap(data: XMLHttpRequest["response"], criteria: string[]) {
  return data.reduce((countMap: any[], currentItem: string) => {
    var position = currentItem
      .toLowerCase()
      .indexOf(criteria.join(" ").toLowerCase(), 0);

    countMap.push({
      value: currentItem,
      position: position,
    });
    return countMap;
  }, []);
}

function sortAndFilter(data: XMLHttpRequest["response"], criteria: string[]) {
  var map = getMatchMap(data, criteria).filter(
    (x: { position: number }) => x.position != -1
  );
  map.sort(
    (a: { position: number }, b: { position: number }) =>
      a.position - b.position
  );
  return map.map((x: { value: any }) => x.value);
}
