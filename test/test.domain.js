"use strict"
var expect = require('chai').expect;
var service = require("../index.js").service;

describe('Test domain', function() {
    describe('Test look domain 80', function() {
        it("Look domain live", function() {
            var look = service.look({
                host: "tuoitre.vn",
                port: 80
            });
            return look.then((data) => {
                expect(data).to.deep.equal({
                    status: "success",
                    code: "OK"
                })
            }, (error) => {
                expect(error).to.deep.equal({
                    status: "success",
                    code: "OK"
                })
            });
        });
        it('Look domain die', function() {
            this.timeout(60000);
            var look = service.look({
                host: "nguyenminhhieu.net",
                port: 80
            });
            return look.then((data) => {
                expect(data).to.deep.equal({
                    status: "success",
                    code: "ERROR"
                })
            }, (error) => {
                expect(error).to.deep.equal({
                    status: "success",
                    code: "ERROR"
                })
            });
        })
    })
    describe('Test look domain 443', function() {
        it('Test domain 443 live', function() {
            var domain = service.look({
                host: "google.com",
                port: 443
            });
            return domain.then((data) => {
                expect(data).to.deep.equal({
                    status: "success",
                    code: "OK"
                })
            }, (error) => {
                expect(error).to.deep.equal({
                    status: "success",
                    code: "ERROR"
                })
            });
        });
        it('Test domain 443 die', function() {
            this.timeout(60000);
            var domain = service.look({
                host: "nguyenminhhieu.net",
                port: 443
            });
            return domain.then((data) => {
                expect(data).to.deep.equal({
                    status: "success",
                    code: "OK"
                })
            }, (error) => {
                expect(error).to.deep.equal({
                    status: "success",
                    code: "ERROR"
                })
            });
        });
    })
    describe('check whois domain', function() {
        it('checking domain', function() {
            var whois = service.whois("google.tv");
            return whois.then((data) => {
                expect(data).to.deep.equal({
                        "ip": [{
                            "address": "216.58.214.228",
                            "family": 4
                        }, {
                            "address": "2a00:1450:400d:803::2004",
                            "family": 6
                        }],
                        "information": {
                            "domainId": "87196881",
                            "whoisServer": "whois.markmonitor.com",
                            "referralUrl": "http://www.markmonitor.com",
                            "updatedDate": "2015-07-27T06:16:01Z",
                            "creationDate": "2002-08-02T16:43:36Z",
                            "sponsoringRegistrar": "MARKMONITOR INC.",
                            "sponsoringRegistrarIanaId": "292",
                            "domainStatus": "ok https://icann.org/epp#ok",
                            "dnssec": "unsigned",
                            "lastUpdateOfWhoisDatabase": "2016-04-15T09:28:44Z <<<",
                            "forMoreInformationOnWhoisStatusCodesPleaseVisitHttps": "//icann.org/epp",
                            "notice": "The expiration date displayed in this record is the date the",
                            "termsOfUse": "You are not authorized to access or query our Whois",
                            "use": "You agree that you may use this Data only for lawful purposes and that",
                            "underNoCircumstancesWillYouUseThisDataTo": "(1) allow, enable, or"
                        },
                        "nameServer": [{
                            "NS": "NS1.GOOGLE.COM"
                        }, {
                            "NS": "NS2.GOOGLE.COM"
                        }, {
                            "NS": "NS3.GOOGLE.COM"
                        }],
                        "expiryDate": "2016-08-02T16:43:36Z",
                        "domainName": "GOOGLE.TV"
                    }

                )
            }), (error) => {
                expect(error).to.deep.equal({
                    status: "success",
                    code: "ERROR"
                });
            }
        });
    });
    describe("check url", function() {
        it('check url without comparision', function() {
            var compare = service.compare('http://ip-api.com/json/208.80.152.201');
            return compare.then((data) => {
                expect(data).to.deep.equal({
                    equal: false,
                    data: {
                        as: 'AS14907 Wikimedia Foundation Inc.',
                        city: 'San Francisco',
                        country: 'United States',
                        countryCode: 'US',
                        isp: 'Wikimedia Foundation',
                        lat: 37.7898,
                        lon: -122.3942,
                        org: 'Wikimedia Foundation',
                        query: '208.80.152.201',
                        region: 'CA',
                        regionName: 'California',
                        status: 'success',
                        timezone: 'America/Los_Angeles',
                        zip: '94105'
                    }
                })
            });
        });
        it('check url with comparision http', function() {
            var compare = service.compare('http://ip-api.com/json/208.80.152.201', {
                as: 'AS14907 Wikimedia Foundation Inc.',
                city: 'San Francisco',
                country: 'United States',
                countryCode: 'US',
                isp: 'Wikimedia Foundation',
                lat: 37.7898,
                lon: -122.3942,
                org: 'Wikimedia Foundation',
                query: '208.80.152.201',
                region: 'CA',
                regionName: 'California',
                status: 'success',
                timezone: 'America/Los_Angeles',
                zip: '94105'
            });
            return compare.then((data) => {
                expect(data).to.deep.equal({
                    equal: true,
                    data: {
                        as: 'AS14907 Wikimedia Foundation Inc.',
                        city: 'San Francisco',
                        country: 'United States',
                        countryCode: 'US',
                        isp: 'Wikimedia Foundation',
                        lat: 37.7898,
                        lon: -122.3942,
                        org: 'Wikimedia Foundation',
                        query: '208.80.152.201',
                        region: 'CA',
                        regionName: 'California',
                        status: 'success',
                        timezone: 'America/Los_Angeles',
                        zip: '94105'
                    }
                })
            });
        })
        it("check url with comparision https", function() {
            var compare = service.compare("https://wtfismyip.com/json", {
                "YourFuckingIPAddress": "113.164.30.142",
                "YourFuckingLocation": "Hanoi, 44, Vietnam",
                "YourFuckingHostname": "static.vdc.com.vn",
                "YourFuckingISP": "VDC"
            });
            return compare.then((data) => {
                expect(data).to.deep.equal({
                    equal: true,
                    data: {
                        "YourFuckingIPAddress": "113.164.30.142",
                        "YourFuckingLocation": "Hanoi, 44, Vietnam",
                        "YourFuckingHostname": "static.vdc.com.vn",
                        "YourFuckingISP": "VDC"
                    }
                }, (error) => {
                    expect(error).to.deep.equal({
                        status: "success",
                        code: "ERROR"
                    });
                })
            });
        });
        it("check url without comparion", function() {
            var compare = service.compare("https://wtfismyip.com/json");

            return compare.then((data) => {
                expect(data).to.deep.equal({
                        equal: false,
                        data: {
                            "YourFuckingIPAddress": "113.164.30.142",
                            "YourFuckingLocation": "Hanoi, 44, Vietnam",
                            "YourFuckingHostname": "static.vdc.com.vn",
                            "YourFuckingISP": "VDC"
                        }
                    }

                )
            }, (error) => {
                expect(error).to.deep.equal({
                    status: "success",
                    code: "ERROR"
                });
            });
        })
    })
})