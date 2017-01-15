import React from "react"
import { connect } from "react-redux"

import { fetchPerformanceRevenue } from "../actions/performance"

@connect((store) => {
    return {
        revenue_performances: store.revenue_performances.revenue_performances
    };
})
export default class Layout extends React.Component {
    constructor() {
        super();
        this.revenueStyle = {};
    }

    componentWillMount() {
        this.props.dispatch(fetchPerformanceRevenue());  
    }

    revenueValues(actual, target) {
        const act = Math.floor(actual),
            tar = Math.floor(target);
        
        this.getPercentages(act, tar); 
    }

    getPercentages(actual, target) {
        const now = new Date(),
            day = now.getDate(),
            daysThisMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate(),
            actualPercentage = (actual / target) * 100,
            barLinePercentage = (day / daysThisMonth) * 100,
            bgColor = (actualPercentage > barLinePercentage) ? '#32CD32' : '#e12324';
        
        this.revenueStyle = { 
            barStyle: {
                width: actualPercentage + '%',
                backgroundColor: bgColor
            },
            quota: (target / daysThisMonth) * day,
            barLineStyle: {
                marginLeft: barLinePercentage + '%'
            }
        }
    }

    format(val) {
        return val = '$' + val.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    render() {
        const { revenue_performances } = this.props;
        let revenueCollection;

        if (!!revenue_performances.revenue_performances) {
            revenueCollection = revenue_performances.revenue_performances.map((revenue) => {
                return (
                    <div class="placeholder" key={revenue.owner.id}> 
                        <div class="profile">
                            <img src={'../../placeholder.jpg'}/>
                        </div>
                        <div class="profile-info">
                            <div class="name">{revenue.owner.name}</div>
                            <div class="revenueCont">{this.revenueValues(revenue.revenue_actual, revenue.revenue_target)}
                                <div class="actual">{this.format(revenue.revenue_actual)}</div>
                                <div class="target">{this.format(revenue.revenue_target)}</div>
                                <div class="barCont" >
                                    <div style={this.revenueStyle.barStyle} class="bar"></div>
                                    <div style={this.revenueStyle.barLineStyle} class="bar-line"><div class="bar-value">{this.format(this.revenueStyle.quota)}</div></div>
                                </div>
                            </div>
                        </div>    
                    </div>      
                )
            });
        }
        return (
            <div>
                <div>{revenueCollection}</div>
            </div>
        );
    }
}


