module.exports = (addressObject) => {
    let res = "";
    if(addressObject.street){
        res += addressObject.street;
        if(addressObject.city)
            res += ", " + addressObject.city;
        if(addressObject.state)
            res += ", " + addressObject.state;
        if(addressObject.country)
            res += ", " + addressObject.country;
        if(addressObject.zip)
            res += ", " + addressObject.zip
        return {
            input: res,
            types: "address"
        };
    } else{
        throw new Error("street is required");
    }
}
