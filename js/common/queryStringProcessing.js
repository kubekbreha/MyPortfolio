/**
 * Parse qery string to object
 * Warning! If items with same name only last one vill be saved.
 * @returns objest with query string.
 */
function queryString2obj(){
    var urlParams = {},
        match,
        pl     = /\+/g, // Regex for replacing addition symbol with a space:
                        // / - the beginning and the end of the expression
                        // g - modifier to perform a global match (i.e. find all matches instead of the first match only).
                        // \+ - symbol "+"
        search = /([^&=]+)=?([^&]*)/g,// [^&=] - complemented character set: any character except of "&" and "="
                                      // [^&] - complemented character set: any character except of "&"
                                      // + -  the preceding expression 1 or more times
                                      // ? -  the preceding expression 0 or 1 time
                                      // * -  the preceding expression 0 or more times

        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
}
