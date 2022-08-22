    function displayDate(value){
        let options = {
            day: "numeric",
            month: "short",
            year: "numeric"
        }

        let optionWeekday = {
            weekday: "long"
        }

        document.querySelector("#weekday").innerHTML = value.toLocaleDateString("en-GB", optionWeekday);
        document.querySelector("#date").innerHTML = value.toLocaleDateString("en-GB", options);
    }

let today = new Date();
displayDate(today);

