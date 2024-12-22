import React, { useState } from 'react'

const Help = () => {
  
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">help </h1>
            <div className="accordion" id="accordionExample">
                {/* שאלה 1 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className={`accordion-button ${openIndex === 0 ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => toggleAccordion(0)}
                        >
                             Lorem ipsum, dolor sit amet consectetur adipisicing?
                        </button>
                    </h2>
                    <div
                        className={`accordion-collapse collapse ${openIndex === 0 ? 'show' : ''}`}
                        aria-labelledby="headingOne"
                    >
                        <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia expedita at labore officiis perferendis rem dolorum debitis, aut repellat ad quibusdam ab, voluptates, qui quasi placeat tempora tenetur sint repellendus!
                        </div>
                    </div>
                </div>

                {/* שאלה 2 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className={`accordion-button ${openIndex === 1 ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => toggleAccordion(1)}
                        >
                           Lorem ipsum, dolor sit amet consectetur adipisicing?
                        </button>
                    </h2>
                    <div
                        className={`accordion-collapse collapse ${openIndex === 1 ? 'show' : ''}`}
                        aria-labelledby="headingTwo"
                    >
                        <div className="accordion-body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo repudiandae dolorum, ea sed voluptas quisquam repellat. Error nulla, dolor adipisci dolorem illo quam nobis nesciunt officia optio quo nostrum vitae?
                        </div>
                    </div>
                </div>

                {/* שאלה 3 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className={`accordion-button ${openIndex === 2 ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => toggleAccordion(2)}
                        >
                            Lorem ipsum, dolor sit amet consectetur adipisicing?
                        </button>
                    </h2>
                    <div
                        className={`accordion-collapse collapse ${openIndex === 2 ? 'show' : ''}`}
                        aria-labelledby="headingThree"
                    >
                        <div className="accordion-body">
                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore rem maiores quisquam saepe, ea repellendus fuga vel odit. Inventore error quam porro delectus quo ex eligendi, iusto libero amet quae.
                        </div>
                    </div>
                </div>

                {/* שאלה 4 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button
                            className={`accordion-button ${openIndex === 3 ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => toggleAccordion(3)}
                        >
                             Lorem ipsum, dolor sit amet consectetur adipisicing?

                        </button>
                    </h2>
                    <div
                        className={`accordion-collapse collapse ${openIndex === 3 ? 'show' : ''}`}
                        aria-labelledby="headingFour"
                    >
                        <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis pariatur alias ipsam quae unde. Eos quasi minus consequatur ipsum laudantium accusantium alias eligendi nostrum. Maxime hic labore fuga distinctio repellendus.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help