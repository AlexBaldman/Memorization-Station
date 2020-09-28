import React from 'react'

export default function Home () {
    
    return (
      <div className="home">
      
        <div className='title-container'>
          <h2>home</h2>
        </div>
        
        <div className=''>
          <p>
            Memorization Station is a web app designed to help people to in learning about, and developing their own, memory system frameworks.
            Memory systems have been used throughout history to make it easier to memorize large amounts of information.  Research into these systems is ongoing today,
            and their capabilities continue to grow as we gain new insights into the brain and how it stores and retrieves data.
          </p>
          <p>
            A basic concept underlying most memorization systems is this: by creating a scaffolding of known objects/places/things which can be associated 
            with new data to be memorized, we are able to create vivid associations and exercise the 'muscles' of our imagination while increasing our ability 
            to recall information.  This allows the brain to utilize the visual cortex's innate ability to create vivid memories with visual information.
          </p>
          <p>
            In its initial implementation, Memorization Station allows users to build charts which are made up of 'Memory Objects'.  
            These charts are meant to represent collections of 'memory objects' in various forms: palaces, stories, and journeys are common types of these collections
            and will be explored further as content is added to the application. The memory objects that make up these collections aremeant to serve as 'nodes' 
            at which various types of information can be stored and more easily recalled.  
          </p>
          <p>
            Memory Systems can be extremely useful in increasing one's ability to learn and easily remember information about many different topics.  
            As science discovers significant new insights into the inner-workings of the brain, this knowledge can be used to continually make these systems more efficient.
          </p>
        </div>

      </div>
    )
}