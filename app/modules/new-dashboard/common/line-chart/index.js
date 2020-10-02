import { Component } from 'react';
import React from "react";
import './style.scss';
import { Chart } from "react-google-charts";

export class LineChart extends Component{


    constructor(props){
        super(props);
        const {data} = props;
        let temp = [];
        let hticks = []
        temp.push(["Day", "Gravity Points", { role: "tooltip", type: "string", p: { html: true } }]);
        data.map((data,i)=>{
            temp.push([i, data.gp, this.createCustomTooltipContent(data.label, data.gp)]);
            hticks.push({"v": i, "f": data.label});
            
        });
        this.state={
            data: temp,
            hticks: hticks
        };
    }

    createCustomTooltipContent=(day, gp)=> {
        return '<div class="tooltip-div">' +
                    '<span class="tooltip-text-style">' +
                        'Day: <b>' + day + '</b>'+
                        '<br/>' +
                        'Gravity: <b>' + gp + '</b>' +
                '</div>';         
      }
    
    render() {
        const { data, hticks } = this.state;
        const { yLabel } = this.props;
        
        return (
            <div className="chart-main">
                <Chart
                    chartType="LineChart"
                    data={data}
                    width="100%"
                    height="400px"
                    
                    options={{
                        backgroundColor: { fill:'transparent' },
                        hAxis: {
                          title: 'Days',
                          textStyle:{color: '#FFF'},
                          titleTextStyle:{color: '#FFF'},
                          baselineColor:{color: '#FFF'},
                          ticks: hticks,
                          slantedTextAngle: 60,
                          slantedText: true,
                        },
                        vAxis: {
                          title: yLabel,
                          textStyle:{color: '#FFF'},
                          titleTextStyle:{color: '#FFF'},
                          baselineColor:{color: '#FFF'},
                          format: 'short',
                        },
                        series: {
                        //   0: { curveType: 'function' },
                        },
                        legend: { 
                            position: 'bottom',
                            textStyle: {color: '#FFF'},
                        },                        
                        pointShape: 'circle',
                        pointSize: 5,
                        chartArea: {                           
                            right: 20, bottom: 120, top: 20, width: "70%", 
                        },
                        // left:50,bottom:120, top: 20, right:20,width:"100%",height:"100%"
                        axes: {
                            x: {
                              0: {side: 'bottom'}
                            },
                            y: {
                                0: {side: 'left'}
                            }
                        
                        },
                        vaxes:[
                            {title: 'Gravity Points',
                            textStyle:{color: '#FFF'},
                            titleTextStyle:{color: '#FFF'},
                            baselineColor:{color: '#FFF'},},                            
                        ],
                        tooltip: {isHtml: true},
                    }}
                />
            </div>   
        );
    }

}