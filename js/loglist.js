

export function jsonParser(datajson) {
    try {
        return JSON.parse(datajson);
    } catch (error) {
        console.error(error);
        // return "Error parse JSON!";
        return [];
    }
}
  
export  function renderLogList(arr) {
    if(arr.length) {
      const markup = arr.map( item => {
          return renderLogListItem(item);
      }).join("");
      // logList.innerHTML = markup;
      return markup;
    }
}
  
export function renderLogListItem({ id, userName, mult_1, needTime, rightAnswer }) {
    const formatTime = String(needTime).padStart(3, '0');
    return `<li>${id}. ${userName}. Time: ${formatTime} s. Level: ${mult_1} Result: ${rightAnswer}/8</li>`;
}