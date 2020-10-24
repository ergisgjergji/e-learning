import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {

    state = {
        chartData: {
            labels: [],
            datasets:[
              {
                data:[],
                backgroundColor: []
              }
            ]
        }
    }

    componentDidMount() {
        const { question } = this.props;
        const { chartData } = this.state;

        chartData.labels.push(question.alternative_1);
        chartData.datasets[0].data.push(question.checked_1);
        question.correct_1 ? chartData.datasets[0].backgroundColor.push('green') : chartData.datasets[0].backgroundColor.push('red');

        chartData.labels.push(question.alternative_2);
        chartData.datasets[0].data.push(question.checked_2);
        question.correct_2 ? chartData.datasets[0].backgroundColor.push('green') : chartData.datasets[0].backgroundColor.push('red');

        if(question.alternative_3 !== null) {
            chartData.labels.push(question.alternative_3);
            chartData.datasets[0].data.push(question.checked_3);
            question.correct_3 ? chartData.datasets[0].backgroundColor.push('green') : chartData.datasets[0].backgroundColor.push('red');

            chartData.labels.push(question.alternative_4);
            chartData.datasets[0].data.push(question.checked_4);
            question.correct_4 ? chartData.datasets[0].backgroundColor.push('green') : chartData.datasets[0].backgroundColor.push('red');
        }
    }

    render() {
        const { chartData } = this.state;
        const { question } = this.props;

        return (
            <div className="chart">
                <Bar
                    data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: question.question,
                            position: 'bottom',
                            fontSize: 13,
                            fontColor: '#000'
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0
                                },
                                scaleLabel: {
                                  display: true,
                                  labelString: 'Number of students',
                                },
                              }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default BarChart;
