<div className="contain">
          <h2>Object Metadata</h2>
          {objectData && <div>
            <table style={{'border': '1', 'marginLeft': '100px'}}>
              <thead>
                <tr>
                  <th style={{'width': '30%'}}>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(objectData).map(function (key) {
                    /* exclude things like missionsList, etc. */
                    if ( typeof objectData[key] != 'object') {
                      var val = new String(objectData[key]);
                      var idxImg = val.indexOf('.svg');

                      return( <tr key={'row_' + key}>
                          <td style={{'width': '30%'}} key={'k_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                          <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
                            {idxImg > 0 &&
                              <div>
                                <img style={{'backgroundColor': 'black'}} src={objectData[key]}/><br/>
                              </div>
                            }
                            {objectData[key]}
                          </td>
                        </tr>
                      );
                    }
                  })
                }
              </tbody>
            </table>
          </div>






<h2>Object Quests</h2>
        {objectQuests && objectQuests.questsList && <div>
          <table style={{'width': '100%', 'border': '1', 'marginLeft': '100px'}}>
            <thead>
              <th style={{'width': '20%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(objectQuests).map(function (key) {
                  /* exclude things like questsList, etc. */
                  if ( typeof objectQuests[key] != 'object') {

                    var val = new String(objectData[key]);
                    var idxImg = val.indexOf('.svg');

                    return( <tr key={'row_' + key}>
                        <td style={{'width': '20%', 'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
                          {idxImg > 0 &&
                            <div>
                              <img style={{'backgroundColor': 'black'}} src={objectData[key]}/><br/>
                            </div>
                          }
                          {objectData[key]}
                        </td>
                      </tr>
                    );
                  }
                })
              }

              {objectQuests && objectQuests.questsCount > 0 &&
                <tr key={'row_questsList'}>
                  <td colSpan="2">
                    <br/>
                    <h2>{objectQuests.questListTitle}</h2>
                    <table style={{'width': '100%', 'border': '1'}}>
                      <thead>
                        <th>Title</th>
                        <th>Label</th>
                        <th>Link Label</th>
                        <th>Icon URL</th>
                        <th>Quest ID</th>
                      </thead>
                      <tbody>
                        {Object.keys(objectQuests.questsList).map(function(key) {
                          return(
                            <tr>
                              <td>{objectQuests.questsList[key].title}</td>
                              <td>{objectQuests.questsList[key].label}</td>
                              <td>{objectQuests.questsList[key].linkLabel}</td>
                              <td><div>
                                    <img style={{'backgroundColor': 'black'}} src={objectQuests.questsList[key].iconUrl}/><br/>
                                    {objectQuests.questsList[key].iconUrl}
                                  </div>
                              </td>
                              <td>{objectQuests.questsList[key].questId}</td>
                            </tr>
                          )
                         })
                        }
                      </tbody>
                    </table>
                  </td>
                </tr>
              }

            </tbody>
          </table>
        </div>
        }


        <br/>
        <br/>
        <h2>Object Missions</h2>
        {objectMissions && objectMissions.missionsList && <div>
          <table style={{'width': '100%', 'border': '1', 'marginLeft': '100px'}}>
            <thead>
              <th style={{'width': '20%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(objectMissions).map(function (key) {
                  /* exclude things like missionsList, etc. */
                  if ( typeof objectMissions[key] != 'object') {
                    return( <tr key={'row_' + key}>
                        <td key={'k_' + key} style={{'width': '20%', 'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key} style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{objectMissions[key]}</td>
                      </tr>
                    );
                  }
                })
              }

              {objectMissions && objectMissions.missionsCount > 0 &&
                <tr key={'row_missionsList'}>
                  <td colSpan="2">
                    <br/>
                    <h2>{objectMissions.missionListTitle}</h2>
                    <table style={{'width': '100%', 'border': '1'}}>
                      <thead>
                        <th>Title</th>
                        <th>Can Join?</th>
                        <th>Icon</th>
                        <th>Date / Time</th>
                        <th>Telescope Details</th>
                        <th>Scheduled Mission ID</th>
                      </thead>
                      <tbody>
                        {Object.keys(objectMissions.missionsList).map(function(key) {
                          return(
                            <tr>
                              <td>{objectMissions.missionsList[key].title}</td>
                              <td>{objectMissions.missionsList[key].canJoinFlag} - {objectMissions.missionsList[key].joinPrompt}</td>
                              <td><div>
                                    <img style={{'backgroundColor': 'black'}} src={objectMissions.missionsList[key].iconURL}/><br/>
                                    {objectMissions.missionsList[key].iconURL}
                                  </div>
                              </td>
                              <td>
                                {objectMissions.missionsList[key].missionDetails.date.itemText} - {objectMissions.missionsList[key].missionDetails.time.itemText}<br/>
                                {objectMissions.missionsList[key].missionDetails.date.itemIconURL} - {objectMissions.missionsList[key].missionDetails.time.itemIconURL}<br/>
                              </td>
                              <td>
                                {objectMissions.missionsList[key].missionDetails.telescope.itemText}<br/>
                                {objectMissions.missionsList[key].missionDetails.telescope.itemIconURL}<br/>
                              </td>
                              <td>{objectMissions.missionsList[key].scheduledMissionId}</td>
                            </tr>
                          )
                         })
                        }
                      </tbody>
                    </table>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        }