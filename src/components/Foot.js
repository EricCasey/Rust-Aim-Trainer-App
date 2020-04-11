import React, { Component } from "react";

// React-Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// React-Redux Actions
import { LayoutChange } from '../rr_actions/rr_a_layoutChange';


class Foot extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let lay = this.props.layout
    return (
      <div className="Foot" style={{
        height: lay.foot ? '300px' : '36px',
        left: lay.left ? '300px' : '38px',
        width: lay.left ? 'calc(100% - 300px)' : 'calc(100% - 38px)'
      }}>
        <div id="hoverBox-Foot" onClick={this.props.LayoutChange}>^</div>
        <h2>ABOUT</h2>
        <div id="aboutCont">
          <div className="triple">
            <h3>LEGAL</h3>
            <div id="legalArea">

              <h5>Mission Statement:</h5>
              <p>This is a fan-made website. The game of Rust has many weapons. 
                 Weapons of the automatic variety are notoriously difficult to control 
                 but have a reasonably consitant recoil pattern. This project is an attempt
                 at building a training environment for the aforementioned patterns and was inspired by &nbsp;
                 <a href="https://rustyrecoil.com/" target="_blank" rel="noopener noreferrer">Rusty Recoil</a>.</p>
              
              <h5>Note From The Developer:</h5>
              <p>I made this for fun after finding <a href="https://rustyrecoil.com/" target="_blank" rel="noopener noreferrer">Rusty Recoil</a> during the COVID-19 quarrantine.
                 I reached out to the <a href="https://www.reddit.com/r/playrust/comments/9x3n3h/a_friend_and_i_created_a_rust_recoil_training/" target="_blank" rel="noopener noreferrer">OP of Rusty Recoil on Reddit</a> to see if it was okay that I did this but I didn't get an answer.
                 It's not perfect, and there are a few bugs but it's been a fun excersie and I think it might still help some people to understand
                 the recoil patterns without having to grind for hours. If you're Facepunch or Rusty Recoil please let me know if you have a problem with this site.
              </p>
              
              <h5>Copyrights:</h5>
              <p>I do not own any of the images or sounds used on this site.
                 Most images are taken from the great great game Rust which is owned by Facepunch, one was
                 lifted from <a href="https://rustyrecoil.com/" target="_blank" rel="noopener noreferrer">Rusty Recoil</a> maintained by <a href="https://redarrowmarketing.com/" target="_blank" rel="noopener noreferrer">Red Arrow Marketing</a>.&nbsp;
                 If you are <a href="https://facepunch.com/" rel="noopener noreferrer">Facepunch</a>, and feel I've have violated your copyrights in any way, 
                 please contact me and we will make any necessary changes: <a href="mailto:Eric@Casey.Works">Eric@Casey.Works</a>
              </p>

              <h5>Privacy Policy</h5>
              <p>Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
              Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.
              We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.
              We will only retain personal information as long as necessary for the fulfillment of those purposes.
              We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.
              Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
              We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
              We will make readily available to customers information about our policies and practices relating to the management of personal information.
              We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.
              </p>

              <h5>Terms Of Service</h5>
              <h6>1. Terms</h6>
              <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trade mark law.</p>
              <h6>2. Use License</h6>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on this website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server. This license shall automatically terminate if you violate any of these restrictions and may be terminated by Casey_Works at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
              <h6>3. Disclaimer</h6>
              <p>The materials on this website are provided "as is". Casey_Works makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Casey_Works does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet website or otherwise relating to such materials or on any sites linked to this site.</p>
              <h6>4. Limitations</h6>
              <p>In no event shall Casey_Works or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on Casey_Works' Internet site, even if Casey_Works or a Casey_Works authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
              <h6>5. Revisions and Errata</h6>
              <p>The materials appearing on this website could include technical, typographical, or photographic errors. Casey_Works does not warrant that any of the materials on its website are accurate, complete, or current. Casey_Works may make changes to the materials contained on its website at any time without notice. Casey_Works does not, however, make any commitment to update the materials.</p>
              <h6>6. Links</h6>
              <p>Casey_Works has not reviewed all of the sites linked to its Internet website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Casey_Works of the site. Use of any such linked website is at the user's own risk.</p>
              <h6>7. Site Terms of Use Modifications</h6>
              <p>Casey_Works may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>
              <h6>8. Governing Law</h6>
              <p>Any claim relating to Casey_Works' website shall be governed by the laws of Canada without regard to its conflict of law provisions. General Terms and Conditions applicable to Use of a Website.</p>

            </div>
          </div>
          <div className="triple">
            <h3>LINKS</h3>
            <div id="shopArea">
              {/* merch store = https://store.facepunch.com/collections/rust
              rust on steam = https://store.steampowered.com/app/252490/Rust/
              gamerall.gg = partners@gamerall.gg
              razer mice = https://www.razer.com/affiliate
              mousepad = affiliates@steelseries.com
              nvidia = https://www.nvidia.com/en-us/about-nvidia/partners/
              ironside = https://ironsidecomputers.com/sponsorship/?v=00dc5da36527 */}

              <div className="affiliateArea">
                <h4>BUY RUST</h4>
                <p>'This is the best gave ever made.' <br/> &nbsp;&nbsp;&nbsp;- Casey_Works</p>
                <img alt="preview" src="https://i.imgur.com/3TaLPHC.jpg" />
              </div>

              <div className="affiliateArea">
                <h4>BUY RUST MERCH</h4>
                <p>Let everyone know you're a Chad.</p>
                <img alt="preview" src="https://i.imgur.com/UINLkUN.jpg" />
              </div>

              <div className="affiliateArea">
                <h4>RUSTY RECOIL</h4>
                <p>This is the site that inspired this site.</p>
                <img alt="preview" src="https://i.imgur.com/UINLkUN.jpg" />
              </div>

              <div className="affiliateArea">
                aim training servers list
              </div>

              <div className="affiliateArea">
                more affiliate links here
              </div>

            </div>
          </div>
          <div className="triple">
            <h3>CONTACT</h3>
            <h4>Casey_Works</h4>
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme,
    layout: state.layout
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    LayoutChange: LayoutChange
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Foot);
