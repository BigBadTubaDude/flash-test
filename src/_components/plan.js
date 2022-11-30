async function defectInsert() { //66
    var currentBarId = firstBarToSubmit;
    var insertDefectsQuery = `
        INSERT INTO [US_Project_Management_Test].[dbo].[Coleman_Paint_Defect_Data]
        (BarId, Location, DefectType, TopBot, Side, LeftRight, DateEntered)
        VALUES `;
    for (let b = 0; b < defectBarList.length; b++) {
      for (let d = 0; d < defectBarList[b]['defects'].length; d++) {
        insertDefectsQuery += `(
          ${currentBarId},
          '${defectBarList[b]['defects'][d]['location']}',
          '${defectBarList[b]['defects'][d]['typeDefect']}',
          '${defectBarList[b]['defects'][d]['orientation'][0]}',
          '${defectBarList[b]['defects'][d]['side']}',
          '${defectBarList[b]['defects'][d]['leftRight'][0]}',
          '${submitDate.toISOString().split('T')[0]}'),`
          ;
        }
        currentBarId += 1; //after defects for one bar have all been added, increment BarId for next set of defects
      }
      insertDefectsQuery = insertDefectsQuery.slice(0, insertDefectsQuery.length - 1) + ";"
      let insertDefectRequestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'query': insertDefectsQuery })
      };
      if (defectBarList.length > 0) {   //Only insert if there are bars to insert
        insertFetchSQL(insertDefectRequestOption)
        //   //  setDefectBarList([]); //Resets list of bars on review page and in state !!!!!!!!UNCOMMENT
      }
    };

    async function selectSetFirstBarFetchSQL() { //Submits SQL queries and resets 193
        var getDataFromDB = "SELECT * FROM [US_Project_Management_Test].[dbo].[Coleman_Paint_Bar_Data]";
        const getFirstBarIdRequestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({'query': getDataFromDB})
        };
        fetch(url, getFirstBarIdRequestOptions)
          .then(async response => {
            response.json().then(data => {
              // set State  
              setFirstBarToSubmit((data.Table1[data.Table1.length - 1].BarId));//sets number to first bar to be submitted
              // console.log(data.Table1[4].BarId)
              // console.log(response.Table1);
            });
            // console.log(response);
            // response.json().then(data => {console.log(data)});
            // console.log(response.json().then(data => {data}));

            const isJson = response.headers.get('content-type').includes('application/json');
            const data = isJson &&  await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            } else {
              return data;
              // console.log(data);
            }
            // this.setState({ postId: data.id })
          }).catch(error => {
            // this.setState({ errorMEssage: error.toString() })
            console.error('an error!', error);
            return error;
          })

      }

async function insertFetchSQL(requestOptions) { //Submits SQL queries and resets  226
    if (userName == "Not set") { //checks that userName is set. Does nothing (returns) if not
      return;
    } else {

      fetch(url, getFirstBarIdRequestOptions)
        .then(async response => {
          const isJson = response.headers.get('content-type').includes('application/json');
          const data = isJson && await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          } else {
            // console.log(data);
            return "bars submitted"
          }
          // this.setState({ postId: data.id })
        }).catch(error => {
          // this.setState({ errorMEssage: error.toString() })
          console.error('an error!', error);
          return error;
        })
      
    }
  }

  function submitPaintDayToDatabase(event) {
    event.preventDefault();            
    ////////////////////////Insert bars into SQL
    //make string with queries to insert each bar
    var insertBarsQuery = `INSERT INTO [US_Project_Management_Test].[dbo].[Coleman_Paint_Bar_Data]
    (UserName, BarType, Material, Width, Humidity, Temperature, Phase, Rack, DippedSprayed, dateEntered) VALUES `;
    for (let i = 0; i < defectBarList.length; i++) {
      insertBarsQuery += `
         ('${userName}',
          '${defectBarList[i].barType}',
         '${defectBarList[i].materialType}',
         ${parseInt(defectBarList[i].width)},
         ${parseInt(defectBarList[i].humidity)},
         '${parseInt(defectBarList[i].temp)}',
         '${defectBarList[i].phase}','${defectBarList[i].rackPosition}',
         '${defectBarList[i].dipSpray[0]}',
         '${submitDate.toISOString().split('T')[0]}')`
         ;
      // console.log(insertBarsQuery);
      if (i != defectBarList.length - 1) {
        insertBarsQuery += ",";
      } else {
        insertBarsQuery += ";";
      }
    }
    
    ///////////////////Insert Defects into SQL Query


    
    ///////Create requestOptions 
    //insert bars request options
    let insertBarRequestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'query': insertBarsQuery })
    };

    //insert defects request options

    if (defectBarList.length > 0) {   //Only insert if there are bars to insert
      insertFetchSQL(insertBarRequestOption)
      .then(selectSetFirstBarFetchSQL())
      .then(defectInsert()) //Gets the first number to be assigned to BarId for defect inserts and assigns it to firstBarToSubmit state
      ; //Inserts defective bars into SQL table 
      ///////// fetch bar id for defect bar id

      //  setDefectBarList([]); //Resets list of bars on review page and in state !!!!!!!!UNCOMMENT
    }
  }