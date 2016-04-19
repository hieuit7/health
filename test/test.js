"use strict"
var chai = require("chai");
var expect = require('chai').expect;
var service = require("../src/services/services.js");
describe('service', function() {
  describe('#ssh()', function() {
    it('check ssh', function() {
      var connected = service.ssh({
        host: "gitlab.resource",
        port: 22
      });
      return connected.then((result) => {
        expect(result).to.deep.equal(result, {
          status: "success",
          code: "OK"
        }, "OK");
      }, (error) => {
        expect(error).to.deep.equal({
          status: "success",
          code: "ERROR"
        });
      });
    });
    it('check ssh fail', function() {
      //this.timeout(12000);
      var connected = service.ssh({
        host: "gitlab.resources",
        port: 22
      });
      return connected.then((result) => {
        expect(result).to.deep.equal(result, {
          status: "success",
          code: "OK"
        });
      }, (error) => {
        expect(error).to.deep.equal({
          status: "success",
          code: "ERROR"
        });
      });
    });
  });
  describe('check udp port', function() {
    it('check open udp port', function() {
      var udp = service.udp({
        port: 53,
        host: "localhost"
      });
      return udp.then((data) => {
        expect(data).to.deep.equal({
          status: "success",
          code: "OK"
        })
      }, (error) => {
        console.log(error);
        expect(error).to.deep.equal({
          status: "success",
          code: "ERROR"
        })
      });
    })
  });
  describe('check whois domain', function() {
    it('checking domain', function() {
      //this.timeout(12000);
      var whois = service.whois("google.tv");
      return whois.then((data) => {
        expect(data).to.deep.equal(

          {
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

      }
    });
  });
  describe("check url", function() {
    it("check url without compare", function() {
      var compare = service.compare("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592|40.6905615%2C-73.9976592|40.6905615%2C-73.9976592|40.6905615%2C-73.9976592|40.6905615%2C-73.9976592|40.6905615%2C-73.9976592|40.659569%2C-73.933783|40.729029%2C-73.851524|40.6860072%2C-73.6334271|40.598566%2C-73.7527626|40.659569%2C-73.933783|40.729029%2C-73.851524|40.6860072%2C-73.6334271|40.598566%2C-73.7527626&key=AIzaSyC7wTia4jUry-Cx_94RQtHhmjdJb0P_q-g");
      return compare.then((data) => {
        expect(data).to.deep.equal(

          {
            "equal": false,
            "data": {
              "destination_addresses": [
                "334-350 Hicks St, Brooklyn, NY 11201, USA",
                "334-350 Hicks St, Brooklyn, NY 11201, USA",
                "334-350 Hicks St, Brooklyn, NY 11201, USA",
                "334-350 Hicks St, Brooklyn, NY 11201, USA",
                "334-350 Hicks St, Brooklyn, NY 11201, USA",
                "334-350 Hicks St, Brooklyn, NY 11201, USA",
                "543-633 Dr Wesley McDonald Ave, Brooklyn, NY 11203, USA",
                "66-0-66-26 103rd St, Rego Park, NY 11374, USA",
                "925-1001 N Village Ave, Rockville Centre, NY 11570, USA",
                "301-327 Beach 19th St, Far Rockaway, NY 11691, USA",
                "543-633 Dr Wesley McDonald Ave, Brooklyn, NY 11203, USA",
                "66-0-66-26 103rd St, Rego Park, NY 11374, USA",
                "925-1001 N Village Ave, Rockville Centre, NY 11570, USA",
                "301-327 Beach 19th St, Far Rockaway, NY 11691, USA"
              ],
              "origin_addresses": [
                "565-569 Vermont St, Brooklyn, NY 11207, USA"
              ],
              "rows": [{
                "elements": [{
                  "distance": {
                    "text": "6.5 mi",
                    "value": 10410
                  },
                  "duration": {
                    "text": "33 mins",
                    "value": 1957
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "6.5 mi",
                    "value": 10410
                  },
                  "duration": {
                    "text": "33 mins",
                    "value": 1957
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "6.5 mi",
                    "value": 10410
                  },
                  "duration": {
                    "text": "33 mins",
                    "value": 1957
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "6.5 mi",
                    "value": 10410
                  },
                  "duration": {
                    "text": "33 mins",
                    "value": 1957
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "6.5 mi",
                    "value": 10410
                  },
                  "duration": {
                    "text": "33 mins",
                    "value": 1957
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "6.5 mi",
                    "value": 10410
                  },
                  "duration": {
                    "text": "33 mins",
                    "value": 1957
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "2.9 mi",
                    "value": 4662
                  },
                  "duration": {
                    "text": "17 mins",
                    "value": 1011
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "8.5 mi",
                    "value": 13739
                  },
                  "duration": {
                    "text": "23 mins",
                    "value": 1351
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "15.8 mi",
                    "value": 25440
                  },
                  "duration": {
                    "text": "29 mins",
                    "value": 1711
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "13.2 mi",
                    "value": 21297
                  },
                  "duration": {
                    "text": "33 mins",
                    "value": 1951
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "2.9 mi",
                    "value": 4662
                  },
                  "duration": {
                    "text": "17 mins",
                    "value": 1011
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "8.5 mi",
                    "value": 13739
                  },
                  "duration": {
                    "text": "23 mins",
                    "value": 1351
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "15.8 mi",
                    "value": 25440
                  },
                  "duration": {
                    "text": "29 mins",
                    "value": 1711
                  },
                  "status": "OK"
                }, {
                  "distance": {
                    "text": "13.2 mi",
                    "value": 21297
                  },
                  "duration": {
                    "text": "33 mins",
                    "value": 1951
                  },
                  "status": "OK"
                }]
              }],
              "status": "OK"
            }
          }

        )
      }, (error) => {

      });
    })
  })
});