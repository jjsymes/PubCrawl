let pubList = [
    "3 Johns",
    "The Castle",
    "The George and Monkey",
    "The Harlequin",
    "Mikkeller Brewpub",
    "Betsey Trotwood",
    "The Holy Tavern",
    "Hope Smithfield",
    "Farringdon Tap"
]

function populatePubList() {
    let pubListBody = $(".pub-list-body");
    pubListBody.html("");
    for (let i = 0; i < pubList.length; i++) {
        let pub = pubList[i];
        let pubRow = $("<tr></tr>");
        let pubNumber = $("<td></td>");
        let pubName = $("<td></td>");
        let pubCheckbox = $("<td></td>");
        pubNumber.html((i + 1).toString() + ".");
        pubName.html(pub);
        let pubCheckboxIdentifier = "pub-" + i.toString();
        pubCheckbox.html("<input type='checkbox' class='zoom-25 " + pubCheckboxIdentifier + "' id='" + pubCheckboxIdentifier + "' name='" + pubCheckboxIdentifier + "' value='" + pub + "'>");
        pubRow.append(pubNumber);
        pubRow.append(pubName);
        pubRow.append(pubCheckbox);
        pubListBody.append(pubRow);
    }
}

function totalPubsVisited() {
    let totalPubsVisited = 0;
    $(":checkbox").each(function () {
        if (this.checked) {
            totalPubsVisited++;
        }
    });
    return totalPubsVisited;
}

function unhideElement(elementIdentifier) {
    $(elementIdentifier).removeAttr("hidden");
}

function recheckCheckboxes() {
    var checkedCheckboxes = JSON.parse(localStorage.getItem('checkedCheckboxes'));
    if (checkedCheckboxes) {
        Object.keys(checkedCheckboxes).forEach(function (element) {
            var checked = checkedCheckboxes[element];
            $("." + element).prop('checked', checked);
        });
    }
}

function updateCheckedCheckboxesValue() {
    var checkedCheckboxes = {};
    $(":checkbox").each(function () {
        checkedCheckboxes[this.id] = this.checked;
    });
    localStorage.setItem(
        'checkedCheckboxes',
        JSON.stringify(checkedCheckboxes),
        expires = 7
    );
}

function fillProgressBar() {
    let totalPubs = pubList.length;
    let visitedPubsCount = totalPubsVisited();
    let percentage = (visitedPubsCount / totalPubs) * 100;
    let progressBarFill = $(".progress-bar-fill");
    let progressBarFillText = $(".progress-bar-fill-text");
    let progressBarFillPercentage = $(".progress-bar-fill-percentage");
    progressBarFill.css("width", percentage.toString() + "%");
    progressBarFillPercentage.html(percentage.toFixed(2) + "%");
    let beerEmojis = "";
    for (let i = 0; i < percentage; i++) {
        beerEmojis += "🍺".repeat(10);
    }
    progressBarFillText.html(beerEmojis);
}

function checkWin() {
    let totalPubs = pubList.length;
    let visitedPubsCount = totalPubsVisited();
    if (visitedPubsCount == totalPubs) {
        unhideElement(".crawl-complete-msg");
    } else {
        $(".crawl-complete-msg").attr("hidden", true);
    }
}

populatePubList();
unhideElement(".progress-bar");

$(":checkbox").on("change", function () {
    updateCheckedCheckboxesValue();
    fillProgressBar();
    checkWin();
});

recheckCheckboxes();
fillProgressBar();
checkWin();