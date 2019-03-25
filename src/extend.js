String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Object.defineProperty(Object.prototype, 'hasNestedProperties',{
    value: function(){
        let array = Array.prototype.slice.call(arguments);
        let obj = this;
        for (let i = 0; i < array.length; i++) {
            if (!obj || !obj.hasOwnProperty(array[i])) {
                return false;
            }
            obj = obj[array[i]];
        }
        return true;
    },
    writable: true,
    configurable: true,
    enumerable: false
});
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};