export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.items = items;
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch(e) {}
    }

    bindTriggers(column, columnCounter, columnItems) {
        column.querySelector('.plus').addEventListener('click', () => {
            if (columnCounter !== columnItems.length - 2) {
                columnItems[columnCounter].style.display = 'flex';
                columnItems[columnCounter].classList.add('animated', 'fadeInUp');
                columnCounter++;
            } else {
                columnItems[columnCounter].style.display = 'flex';
                columnItems[columnCounter].classList.add('animated', 'fadeInUp');
                columnItems[columnItems.length - 1].remove();
            }
        });
    }

    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        try {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
            this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
        } catch(e) {}
    }
}