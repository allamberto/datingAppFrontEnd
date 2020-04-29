import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/customDropdown.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.checkOptions = this.checkOptions.bind(this);
        this.loadStates = this.loadStates.bind(this);
        this.loadMajors = this.loadMajors.bind(this);
        this.loadMinors = this.loadMinors.bind(this);
        this.loadDorms = this.loadDorms.bind(this);
        this.checkArray = this.checkArray.bind(this);
        this.changes = this.changes.bind(this);

        this.state = {
            multi: this.props.multi,
            states: [],
            majorOptions: [],
            minorOptions: [],
            dorms: [],
            years:
          		[ {label: "2020", value: "2020"},
          		  {label: "2021", value: "2021"},
          		  {label: "2022", value: "2022"},
                {label: "2023", value: "2023"}],
  	        identity:
		          [ {label: "Male", value: "male"},
                {label: "Female", value: "female"},
                {label: "Choose Not to Identify", value: "nonbinary"}],
	          orientation:
		          [ {label: "Male", value: "male"},
                {label: "Female", value: "female"},
                {label: "Choose Not to Identify", value: "nonbinary"}]
        }

      	this.loadStates();
      	this.loadMajors();
      	this.loadMinors();
      	this.loadDorms();
  }

  loadStates() {
    fetch('http://3.211.82.27:8800/states')
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            console.error('There was an error!', error);
            return Promise.reject(error);
        }
        var s = [];
        for(var state of data) {
            s.push({
                label: state.name,
                value: state.code
            });
        }

	this.setState({states: s});
     })
     .catch(error => {
       console.error('There was an error!', error);
     });

  }

  loadMajors() {
    fetch('http://3.211.82.27:8800/majors')
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        var majors = [];
        for(var major of data) {
            majors.push({
                label: major,
                value: major
            });
        }
        this.setState({majorOptions: majors});
     })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  loadMinors() {
    fetch('http://3.211.82.27:8800/minors')
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        var minors = [];
        for(var minor of data) {
            minors.push({
                label: minor,
                value: minor
            });
        }
        this.setState({minorOptions: minors});

     })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  loadDorms() {
    fetch('http://3.211.82.27:8800/dorms')
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

     	var dorms = [];
        for(var dorm of data) {
            dorms.push({
                label: dorm.dorm,
                value: dorm.dorm
            });
        }
        this.setState({dorms: dorms});

     })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  checkArray() {
    if (this.props.ops == "states") {
      return this.state.states;
    } else if (this.props.ops == "majors") {
      return this.state.majorOptions;
    } else if (this.props.ops == "minors") {
      return this.state.minorOptions;
    } else if (this.props.ops == "dorms") {
      return this.state.dorms;
    } else if (this.props.ops == "years") {
      return this.state.years;
    } else if (this.props.ops == "identity") {
      return this.state.identity;
    } else if (this.props.ops == "orientation") {
      return this.state.orientation;
    }
  }

  checkOptions(option) {
    if (!this.props.value) {
      return false;
    }
    console.log("sadfasfasgassfda");
    console.log(this.state.multi);
    if (!this.state.multi) {
      return option.value === this.props.value;
    }
    console.log("sadfasfasgassfda");
    console.log("---->" + this.props.value);
    console.log("---->" + option.value);
    return this.props.value.includes(option.value);
  }

  changes(e) {
    if(e == null) return;
    console.log(e);
  }

   render() {
     console.log(this.props.value);
      var options = this.checkArray();
      var textClass = (this.props.textClassName != null) ? this.props.textClassName : "title-textbox";
	return(
	      <div>
		<label className={textClass}>{this.props.header}</label>
		<Select options={options} isMulti={this.state.multi} isSearchable={true} placeholder={this.props.placeholder} value={options.filter(option => this.checkOptions(option))} className={this.props.className} onChange={this.props.callback}/>
	      </div>
  	);
   }
}
export default App;
