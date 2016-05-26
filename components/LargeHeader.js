import React from 'react';

function LargeHeader() {
  return (
    <nav className="navbar navbar-default largeheader_background" style={{backgroundImage: 'url(' + 'assets/images/bg.png' +')'}}>
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">
                    <img src={'assets/images/logo-small-white@3x.png'} />
                </a>
            </div>
            <nav id="navbar" className="collapse navbar-collapse">
            </nav>
        </div>
        <div id="largeheader_content" className="container">
            <div className="row">
                <div className="largeheader_centerText">
                    Find the best community<br />
                    resources for your needs
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-1 col-xs-1">
                </div>
                <div className="input-group col-lg-8 col-md-8 col-sm-10 col-xs-10">
                    <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term" />
                    <div className="input-group-btn">
                        <button id="largeheader_searchbutton" className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i> Search</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default LargeHeader;
