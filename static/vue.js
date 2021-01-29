//Set up vue app
let app = new Vue({
    el: '#container',
    data: {
        lessons: {},

        cart: [],

        showProducts: true,

        info: "",

        order: {
        },

        btnShow: false,
    },
    created: function(){
        fetch('https://tester3145.herokuapp.com/collection/lessons').then(
            function(response){
                response.json().then(
                    function(json){
                        app.lessons = json
                    }
                )
            }
        )
    },
    methods: {
        //Method to add to cart
        add: function (lesson) {
            this.cart.push(lesson);
            lesson.spaces--;

        },
        showCheckout() {
            this.showProducts = this.showProducts ? false : true;
        },
        ordered(){
            alert("Order Submitted !");
            this.cart = [];
        },       
        nameFill() {
            let btn = document.getElementById("checkoutBtn");
            let name = document.getElementById("name");
            let number = document.getElementById("number");

            if (name.value == '' || number.value == '') {
                btn.style.visibility = 'hidden';
            } else {
                document.getElementById("buttonn").innerHTML = `<button id="checkoutBtn" style="margin-top: 30px; background-color: darkblue; border-radius: 0" @click="ordered()"> Checkout</button>`
            }
        },
        canAdd(lesson) {
            return lesson.spaces > this.cartCount(product.id);
        },

        zeroo() {
            return 0;
        },
        remove(lesson) {
            let index = this.cart.indexOf(lesson);
            if (index > -1) {
                this.cart.splice(index, 1);
                lesson.spaces++;
            }
        },
        sortPrice() {
            function compare(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },
        sortTitle() {
            function compare(a, b) {
                if (a.title > b.title) return 1;
                if (a.title < b.title) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },
        sortLocation() {
            function compare(a, b) {
                if (a.location > b.location) return 1;
                if (a.location < b.location) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },
        sortSpaces() {
            function compare(a, b) {
                if (a.spaces > b.spaces) return 1;
                if (a.spaces < b.spaces) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },
        ascending() {
            function compare(a, b) {
                if (a.lesson > b.lesson) return 1;
                if (a.lesson < b.lesson) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },
        descending() {
            function compare(a, b) {
                if (a.lesson < b.lesson) return 1;
                if (a.lesson > b.lesson) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },
        beforeMount(){
            this.getLessons()
        }
    },
    computed: {
        itemCount() {
            return this.cart.length || '';
        },
        isCart() {
            if (this.cart.length > 0)
                return this.cart.length;
        }
    },
})
