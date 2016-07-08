

/*------------ 基本数据结构 start ------------------*/
window.$T = window.$T || {};
//DTO类型
$T.DTO = function (type, data) {
    this.type = type;
    this.data = data;
    this.transferChanged = true;
    this.changedProp = [];
    this.dtoList = null;
}


//DTO明细类型
$T.DTOCollection = function (type, cols, rows) {
    this.type = type;
    this.cols = cols;
    this.rows = rows;
    this.list = [];
}

Object.assign($T.DTO.prototype, {
    TransferChanged: function (v) {
        this.transferChanged = v;
    },
    Property: function (name, value) {
        if (!value) {
            return this.data[name];
        }

        this.data[name] = value;
        this.changedProp.push(name);
    },
    toJSON: function () {
        if (this.type == null) this.type = '';
        return JSON.stringify({ '__type': this.type, "type": this.type, "data": this.data });
    },
    UnTypify: function () {
        /*for (var i in this.data) {
        if (this.data[i]) {
        if (typeof this.data[i] != 'function') {
        if (typeof this.data[i].UnTypify == 'function') {
        this.data[i] = this.data[i].UnTypify();
        }
        }
        }
        }
        */
        return this.data;
    },
    Typify: function (dto) {

        if (dto['__type']) this.type = dto['__type'];

        var d = {};
        for (var i in dto) {
            if (typeof dto[i] != 'function') {
                if (dto[i] && dto[i].splice) {
                    if (dto[i].length > 0) {
                        if (typeof dto[i][0] == 'object') {
                            d[i] = new $T.DTOCollection().Typify(dto[i]);
                        }
                        else {
                            d[i] = dto[i];
                        }
                    }
                }
                else {
                    var d1 = dto[i];
                    if (d1 && d1['__type'] && d1['__type'].indexOf('DTO') >= 0) {
                        d[i] = new $T.DTO().Typify(d1);
                    }
                    else {
                        d[i] = d1;
                    }
                }
            }
        }
        this.data = d;
        return this;
    }
}, true);




Object.assign($T.DTOCollection.prototype, {
    ForEach: function (fn, ctx) {
        var i, len, r, rs = this.rows, cs = this.cols, dto;
        if (this.dtoList) {
            var c = ctx || window;
            for (i = 0, len = this.dtoList.length; i < len; ++i) {
                fn.call(c, this.dtoList[i], i);
            }
        }
        for (i = 0, len = rs.length; i < len; ++i) {
            r = rs[i];
            for (var j = 0, len1 = cs.length; j < len1; ++j) {
                dto[cs[j]] = r[j];
            }
            this.dtoList.push(new $T.DTO(this.type, dto));
        }
        this.ForEach(fn, ctx);
    },
    UnTypify: function () {
        var dto, r;
        for (var i = 0, len = this.rows.length; i < len; ++i) {
            dto = {};
            r = this.rows[i];
            for (var j = 0, len1 = this.cols.length; j < len1; ++j) {
                if (r[j]) {
                    if (typeof r[j] != 'function') {
                        if (typeof r[j].UnTypify == 'function') {
                            r[j] = r[j].UnTypify();
                        }
                    }
                }
                dto[this.cols[j]] = r[j];
            }
            this.list.push(dto);
        }
        return this.list;
    },
    Typify: function (list) {
        var rows = [];
        this.cols = [];
        var cols = {};
        var colsLength = 0
        for (var i = 0, len = list.length; i < len; ++i) {
            var dto = list[i];
            for (var k in dto) {
                if (typeof dto[k] != 'function') {
                    if (cols[k]) continue
                    cols[k] = true;
                }
            }
        }
        for (var i in cols) {
            if (typeof cols[i] != 'function') {
                this.cols.push(i);
            }
        }
        for (var i = 0, len = list.length; i < len; ++i) {
            var dto = list[i];
            var r = [];
            for (var k = 0, len1 = this.cols.length; k < len1; ++k) {
                var p = this.cols[k];
                if (dto != null && typeof dto != 'undefined') {
                    if (dto[p] && dto[p].splice) {
                        if (dto[p].length > 0) {
                            if (dto[p][0] && typeof dto[p][0] == 'object') {
                                dto[p] = new $T.DTOCollection().Typify(dto[p]);
                            }
                        }
                        else {
                            r.push(undefined);
                            continue;
                        }
                    }
                    else if (dto[p]) {
                        for (var l in dto[p]) {
                            if (dto[p][l] && dto[p][l].splice) {
                                if (dto[p][l].length > 0) {
                                    if (dto[p][l][0] && typeof dto[p][l][0] == 'object') {
                                        dto[p][l] = new $T.DTOCollection().Typify(dto[p][l]);
                                    }
                                }
                                else {
                                    dto[p][l] = undefined;
                                    continue;
                                }
                            }
                        }
                    }
                    r.push(dto[p]);
                }
            }

            rows.push(r);
        }
        this.rows = rows;
        return this;
    },
    toJSON: function () {
        return JSON.stringify({ "__type": "AjaxPro.DTOCollectionConverter,AjaxPro.2", "type": this.type, "cols": this.cols, "rows": this.rows });
    }
}, true);

exports = $T
/*-------------基本数据结构 end --------------------*/
