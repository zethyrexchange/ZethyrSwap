# EtherMinewar


tronWeb
.contract()
.at('TYEgTs4Jw17F75ALBZkoeogRgUx2vsaZfy')
.then(contract => {
  contract
    .week()
    .call()
    .then(week => {
      contract
        .weekGameList(parseInt(week))
        .call()
        .then(result => {
          let countDay = parseInt(result.countDay);
          let totalDividends = parseInt(result.totalDividends);
          let ended = result.ended;
          console.log(result);
          console.log(parseInt(week))
          console.log("countDay: " + countDay);
          console.log("totalDividends: " + totalDividends);
          console.log("ended: " + ended);
          if (ended == false && countDay == 6) {
            contract
              .round()
              .call()
              .then(round => {
                contract
                  .gameList(parseInt(round))
                  .call()
                  .then(res => {
                    if (parseInt(res.weekId) == parseInt(week)) {
                      let lastRound = parseInt(round);
                      let dayGamesIds = [];
                      for (let idx = lastRound - 6; idx <= lastRound; idx++) {
                        dayGamesIds.push(idx);
                      }
                      console.log(dayGamesIds);
                      console.log("ok");
                     
                    }
                  })
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e))
          }
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
})
.catch(e => console.log(e));
 contract
                        .changeWeekGameDetail(parseInt(week), totalDividends, 7, false, dayGamesIds)
                        .send()
                        .then(hash => console.log(hash))
                        .catch(e => console.log(e));
```
 contract.changeWeekGameDetail(2, 0, 1, false, []).send();
npm install
npm run dev
```
