function getJson(str) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //הפיכת הטקסט למערך בזכרון
            var result = JSON.parse(this.responseText);
            var foods = result["list"]["item"];
            var el = document.getElementById('fld_base_profile_id');

            for (var i = 0; i < foods.length; i++) {
                var dish = foods[i],
                    opt = document.createElement("option");

                opt.id = dish.ndbno;
                opt.text = dish.name;
                opt.value = dish.id;

                el.appendChild(opt);
            }
        }
    };
    xmlhttp.open("GET", "https://api.nal.usda.gov/ndb/search/?format=json&q=" + str + "&sort=n&max=25&offset=0&api_key=DEMO_KEY", true);
    xmlhttp.send();
}