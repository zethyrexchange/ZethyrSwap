export default  {
	numberWithCommas(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
        x = parseFloat(x).toFixed(decimals);
        x = parseFloat(x).toString();
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },
    numberWithCommasRoundUp(x, decimals = 3) {
        if (isNaN(x) == true) x = 0;
        x = Math.ceil(x * 10 ** decimals) / 10 ** decimals;
        x = parseFloat(x).toFixed(decimals);
        x = parseFloat(x).toString();
        x  = x.split(".");
        x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x = x.join('.');
        return x;
    },
    roundUpFloatNumber(x, decimals = 6) {
        if (isNaN(x) == true) x = 0;
        x = Math.ceil(x * 10 ** decimals) / 10 ** decimals;
        x = parseFloat(x).toFixed(decimals);
        x = parseFloat(x).toString();
        x = parseFloat(x);
        return x;
    },
    formatBalance (labelValue, decimals = 2) {
        return Math.abs(Number(labelValue)) >= 1.0e+12
            ? Math.round(Math.abs(Number(labelValue) / 1.0e+12) * 100) / 100 + "T"
            : Math.abs(Number(labelValue)) >= 1.0e+9
              ? Math.round(Math.abs(Number(labelValue) / 1.0e+9) * 100) / 100 + "B"
              : Math.abs(Number(labelValue)) >= 1.0e+6
                ? Math.round(Math.abs(Number(labelValue) / 1.0e+6) * 100) / 100 + "M"
                : Math.abs(Number(labelValue)) >= 1.0e+3
                  ? Math.round(Math.abs(Number(labelValue) / 1.0e+3) * 100) / 100 + "K"
                  : this.numberWithCommas(labelValue, decimals);
    }
}