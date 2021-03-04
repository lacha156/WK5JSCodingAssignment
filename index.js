

class Item {
    constructor(nameOfItem,quantity,addNotes){
        this.nameOfItem = nameOfItem;
        this.quantity = quantity;
        this.addNotes = addNotes;
    }
    describe(){
        return `${this.quantity} of ${this.nameOfItem} Please read notes ${this.addnotes}.`;
    }
}

class store {
    constructor(name){
        this.name =name;
        this.items = [];
        
    }
    addItem(item){
        if(item instanceof Item){
            this.items.push(item);
        } else {
            throw new Error(`You can only add an instance of Item. Argument is not a player:${item}`);
        }
    }
    describe(){
        return `${this.name} has ${this.items.length}items.`;
    }

}

class Menu {
    constructor(){
        this.stores = [];
        this.selectedStore = null;
    }
    start(){
        let selection = this.showMainMenuOptions();
        while(selection != 0){
            switch (selection){
                case '1':
                    this.createStore();
                    break;
                case '2':
                    this.viewStore();
                    break;
                case '3':
                    this.deleteStore();
                    break;
                case '4':
                    this.displayStores();
                    break;
                    default:
                        selection = 0;    
            }
            selection = this.showMainMenuOptions();
            }
            alert('Have fun shopping!');
        }
        showMainMenuOptions(){
            return prompt(`
            0) Exit
            1) Create New Store
            2) View Store Shopping List
            3) Delete Store
            4) Display All Stores
            `);
        }
        showStoreMenuOptions(storeinfo){
            return prompt(`
            0) Back
            1) Create Item
            2) Delete Item
            ____________________
            ${storeinfo}

            `);
        
        }
        displayStores() {
            let storeString = '';
            for (let i = 0; i < this.stores.length;i++){
                storeString += i + ') ' + this.stores[i].name + '\n';
            }
            alert(storeString);
        }
        createStore(){
            let name = prompt ('Enter name for new store:');
            this.stores.push(new store(name));
        }
        viewStore(){
            let index = prompt('Enter the index of the store you wish to view:')
            if(index > -1 && index < this.stores.length){
                this.selectedStore = this.stores[index];
                let description = 'Store Name: '+ this.selectedStore.name + '\n';

                for(let i= 0; i < this.selectedStore.items.length;i++){
                    description += i + ')'  + this.selectedStore.items[i].nameOfItem +   '-'   + this.selectedStore.items[i].quantity + ':'  
                    + this.selectedStore.items[i].addNotes + '\n';
                }
                let selection = this.showStoreMenuOptions(description);
                switch (selection){
                    case '1':
                        this.createItem();
                        break;
                    case '2':
                        this.deleteItem();
                        break;
                    
                }
            }
          }
        deleteStore(){
            let index = prompt ('Enter the index of the store you wish to delete:');
            if (index > -1 && index < this.stores.length){
                this.stores.splice(index,1);
            }
        }
        createItem(){
            let nameOfItem = prompt('Enter name for new item:');
            let quantity = prompt('Enter the amount of the item you want')
            let addNotes = prompt('Enter notes');
           
            this.selectedStore.items.push(new Item(nameOfItem,quantity,addNotes));
        }
        deleteItem(){
            let index = prompt('Enter the index of the item you wish to delte:');
            if (index > -1 && index < this.selectedStore.items.length){
                this.selectedStore.items.splice(index,1);
            }
        }
        
        
    }

    let menu = new Menu();
    menu.start();

