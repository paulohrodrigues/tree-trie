class Trie{
    /*---------------------- Tree Trie Code Begin -------------------------*/ 
    constructor(){
        this.root=null;
        this.resultJson = 
        {
            text: { name: "Root" },
            children: [
            ]
        }
    }
    get(key,x,d=null) {
        if(d===null){
            let x = this.get(key,this.root, 0);
            if(x===null) return null
            return x.val; 
        }else{

            if (x == null) return null;
            if (d == key.length) return x;
            x.next[key[d]]["search"]=true;
            return this.get(key,x.next[key[d]], ++d);
        }
    }
    put(key,val,x,d=null){ 
        if(d===null){
            this.root = this.put(key, val, this.root, 0); 
        }else{
            if (x == null){
                x = new Node();
            }
            if (d == key.length) { 
                x.val = val; 
                return x; 
            }
            let c = key[d];
            x.next[c] = this.put(key, val, x.next[c], ++d);
            return x;
        }  
    }
    delete(key,x,d=null) { 
        if(d===null){
            this.root = this.delete(key,this.root, 0);
        }else{
            if (x == null) return null;
            if (d == key.length){
                if(!this.seExisteMaisRamos(x.next)){
                    return null;
                }else if(this.seExisteMaisRamos(x.next)){
                    x.val=null;
                    return x;
                }
            }else{
                let c = key[d];
                x.next[c] = this.delete(key,x.next[c], ++d);
                if(x.next[c]==null && !(x.next[c]===undefined)){
                    delete x.next[c];
                }
                if(!this.seExisteMaisRamos(x.next) &&  x.val!=true){
                    return null;
                }
                return x;
            }
        } 
    }

    /*---------------------- Tree Trie Code End ---------------------------*/
    
    /*----------------------- additionals begin ---------------------------*/

    seExisteMaisRamos(jsonNext){
        return Object.keys(jsonNext).length>0;
    }

    getResultJsonForChart(){
        return this.resultJson;
    }

    destaca(key,root){
        let string = (root.search===true ? "'" :"") + key + (root.search===true ? "'" :"");
        delete root["search"];
        return string;  
    }

    list(root=this.root,json,i=0){
        
        if(i==0){
            this.resultJson = 
            {
                text: { name: "Root" },
                children: [
                ]
            }
            json = this.resultJson;
        }
        i++;
        let obj = root!=null ? root.next : [];
        
        for(let key in obj){
            if(root.next[key]!=null){         
                json.children.push({
                    text: { name: this.destaca(key,root.next[key]) },
                    children:[]
                });       
            }
            this.list(root.next[key],json.children[json.children.length-1],i);
            
        }
    }
    /*------------------------- additionals end ---------------------------*/
}