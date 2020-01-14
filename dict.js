exports.dict = class {
  constructor(){
    this.Keys = [];
    this.Values = [];
  }
  getVal(key){
    if (key == null) return "Key cannot be null";
    for (var i = 0; i < this.Keys.length; i++) {
      if (this.Keys[i].charAt(0) == "$") key = key.slice(-(key.length-4));
      if (this.Keys[i] == key) {
        return this.Values[i];
      }
    }
    return "Key not found!";
  }

  getMark(mark){
    if (mark == null) return [];
    try{
      var res = [];
      this.Keys.forEach(function (k, v) {
        if (mark == k.substr(0, 4)){
          res.push([k, v]);
        }
      });
      return res;
    }catch(err){}
  }

  inject (key, val) {
        if (key == null || val == null) {
            return "Key or Value cannot be null";
        }
        var keysLength = this.Keys.length;
        var valsLength = this.Values.length;
        // Verify dict integrity before each operation
        if (keysLength != valsLength) {
            return "Dictionary inconsistent. Keys length don't match values!";
        }
        var flag = false;
        for (var i = 0; i < keysLength; i++) {
            if (this.Keys[i] == key) {
                this.Values[i] = val;
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.Keys.push(key);
            this.Values.push(val);
        }
    }
    length(){
      return this.Keys.length;
    }
    getIndex(ind){
      return [this.Keys[ind], this.Values[ind]];
    }
    toSaveStr(){
      var res = "";
      for(var i = 0; i < this.Keys.length; i++){
        res += (this.Keys[i] + "`=" + this.Values[i] + "`\n");
      }
      
      return res;
    }




}