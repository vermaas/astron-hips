import React, { useContext, useState }  from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import Iframe from '@trendmicro/react-iframe';

export default function HipsCard(props) {
        console.log("HipsCard "+props.data.hips_service_url)
    return (
        <Card>
            <Card.Body>
                <Table>
                    <Iframe src={props.data.hips_service_url} width="100%" height={540} />
                </Table>
            </Card.Body>

        </Card>

    );

}


