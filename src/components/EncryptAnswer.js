import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EncryptAnswer extends Component {
    static contextTypes = {
        encrypt: PropTypes.func.isRequired,
    }
    componentDidMount() {
        const {
            encrypt,
        } = this.context;

        let encryptedText
        let encryptedHead

        var data = JSON.stringify(this.props.answer);
        var head = "surveyJS";
        console.log(data);
        encryptedHead = encrypt(head);
        encryptedText = encrypt(data);
        console.log(encryptedText);
        this.props.dispatch({
            type: 'SURVEY_CHECK_ENCRYPT',
            data: {
                encryptedHead,
                encryptedText
            }
        });
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
export default connect()(EncryptAnswer);