
import React, {useState, useEffect }  from 'react';
import { Tabs, Tab, Row, Col, Table } from 'react-bootstrap';

import LoadingSpinner from './LoadingSpinner';
import HipsCard from './HipsCard'

//const url = "https://hips.astron.nl/hipslist"
//const url = "http://localhost:3000/hipslist.txt"
//const url = "https://uilennest.net/astron-hips/hipslist.txt"
//const url = "https://sdc.astron.nl/astron-hips/hipslist.txt"

// read the hipslist from a local file to prevent cors trouble
//import hipsfile from '../assets/hipslist.txt';
//const url = hipsfile

const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000/hipslist.txt"
        : "https://sdc.astron.nl/astron-hips/hipslist.txt";


export default function HipsPage(props) {
    const [ hipsList , setHipsList] = useState(undefined);
    console.log('HipsPage')

    useEffect(() => {
            console.log('useEffect')
            fetchHipsList(url)
        }, []
    );

    // get the data from the api
    async function fetchHipsListAwait(url) {
        console.log('fetchHipsList(' + url + ')')

        const response = await fetch(url, {mode: 'no-cors'})
        const text = await response.text()
        let parsed_results = parseHipsList(text)
        setHipsList(parsed_results)
    }

    // get the data from the api
    const fetchHipsListXHR = (url) => {
        console.log('fetchHipsList(' + url + ')')
        var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
            //alert('readyState: '+this.readyState+', status: '+this.status)

            if (this.readyState == 4) {

                if (this.status === 200) {
                    // Action to be performed when the document is read;
                    let parsed_results = parseHipsList(xhttp.responseText)
                    setHipsList(parsed_results)
                }

                if (this.status === 0) {
                    // Action to be performed when the document is read;
                    alert(xhttp.responseText)
                }

            }
        };
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.send();
    }

    // get the data from the api
    const fetchHipsList = (url) => {
        console.log('fetchHipsList0('+url+')')

        fetch(url,{ mode: 'no-cors'})
            .then(results => {
                console.log('.then')
                return results.text();
            })
            .then(results => {
                console.log('.then again')
                let parsed_results = parseHipsList(results)
                setHipsList(parsed_results)

            })
            .catch(function () {
                alert("fetch jobs from " + url + " failed.");
            })
    }


    // construct the hipsList array of records
    const parseHipsList = (results) => {
        console.log("parseHipsList("+results+")")
        let lines = results.split('\n')
        let records = []
        let record = {}
        let record_nr = 0

        // loop through the results line by line and build the list of records
        for (var i = 0; i < lines.length; i++) {

            try {
                let split_line = lines[i].split('=')

                if (split_line[0].includes('creator_did')) {
                    record['creator_did'] = split_line[1]

                    let title = split_line[1].split("/").pop();
                    record['title'] = title.toUpperCase()
                }

                if (split_line[0].includes('hips_release_date')) {
                    record['hips_release_date'] = split_line[1]
                }

                if (split_line[0].includes('hips_service_url')) {
                    record['hips_service_url'] = split_line[1]
                }

                if (split_line[0].includes('hips_status')) {
                    record['hips_status'] = split_line[1]

                    // this also signals the end of the record
                    // add the record to the records array, and clear the record
                    records.push(record)
                    record = {}
                    record_nr = record_nr + 1
                }
            } catch (e) {
                alert(e)
            }
        }
        return records
    }

    // show spinner as long as the data is not read
    if (!hipsList || hipsList.length===0) return <LoadingSpinner/>

    let tabs_array = []
    for (var i = 0; i < hipsList.length; i++) {
        let my_tab = <Tab className="Tab" eventKey={hipsList[i]['title']} title={hipsList[i]['title']}>
            <HipsCard data={hipsList[i]}/>
        </Tab>
        tabs_array.push(my_tab)
    }
    let renderTabs=<Tabs className="Tab" defaultActiveKey={hipsList[0]['title']} id="hips_tab">
        {tabs_array}
    </Tabs>


    return (
        <div className="App">
            {renderTabs}
        </div>
    );
}