import React from 'react';
import dateFns from 'date-fns';

class Calendar extends React.Component {

    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedNotes: [],
        notas: [
            {
                'month': 2,
                'year': 2019,
                'notas': [
                    {
                    'id': 126,
                    'day': 20,
                    'title': "Parcial",
                    'descripcion': "Estudiar 10 capitulos"
                    },
                    {   'id': 345,
                        'day': 28,
                        'title': "Final",
                        'descripcion': "Estudiar 15 capitulos"
                        }
                 ]
            },
            {
                'month': 1,
                'year': 2019,
                'notas': [
                    {
                     'id': 344,
                    'day': 15,
                    'title': "Parcial",
                    'descripcion': "Estudiar 10 capitulos"
                    },
                    {
                        'id': 123,
                        'day': 15,
                        'title': "Parcial 2",
                        'descripcion': "Estudiar 10 capitulos"
                        },
                        {
                            'id': 124,
                            'day': 15,
                            'title': "Parcial 3",
                            'descripcion': "Estudiar 10 capitulos"
                            },
                    {
                        'id': 125,
                        'day': 20,
                        'title': "Final",
                        'descripcion': "Estudiar 15 capitulos"
                        }
                 ]
            }
        ]
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                         chevrow-left
                    </div>
                </div>
                <div className="col col-center">
                    <span> {dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon"> chevron-right </div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row"> {days} </div>
    }

    renderCells() {
        const {currentMonth, selectedDate} = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
          for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;
            days.push(
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                key={day}
                onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
              >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
                <div className="content-item-day"> {this.renderNotes(cloneDay)}</div>
              </div>
            );
            day = dateFns.addDays(day, 1);
          }

          rows.push(
            <div className="row" key={day}>
              {days}
            </div>
          );
          days = [];
        }

        return <div className="body">{rows}</div>
    }

    renderNotes(date) {
        const day = dateFns.getDate(date);
        const month = dateFns.getMonth(date);
        const year = dateFns.getYear(date);
        const items = this.state.notas.filter(x => x.month === month && x.year === year);
        if(items.length > 0) {
            const notas = items[0].notas.filter(x => x.day === day);
            if(notas.length > 0 ){
                return notas.map( x=> <li 
                    className="item-day" 
                    onClick={() => this.popUpItem(x.descripcion)}
                      key={x.day + x.title}>
                       {x.title}
                       <DeleteButton id={x} deleteItem={this.deleteItem}/>
                       </li>)
            }
        } else {
            
             return '';
        }
    }


    popUpItem = (text) => {
        alert(text);
    } 
    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
     };

    nextMonth = () => { 
        this.setState( {
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => { 
        this.setState( {
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    deleteItem = (x) => {
        console.log(x);
        console.log(this.state.notas);
    };



    render() {
        return (
            <div className="calendar">
                <div> {this.renderHeader()} </div>
                <div> {this.renderDays()} </div>
                <div> {this.renderCells()} </div>
            </div>
        );
    }
}

class DeleteButton extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <span  onClick={() => this.props.deleteItem(this.props.id)} className="delete-item"> X </span>
        )
    }
}


export default Calendar;