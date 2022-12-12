import { useEffect, useState } from "react";
import minBy from 'lodash/minBy';
import { useRef } from "react";


class Vertex {
  constructor(value) {
    this.value = value;
  }
}

class Edge {
  constructor(startNode, finishNode, weight) {
    this.startNode = startNode;
    this.finishNode = finishNode;
    this.weight = weight;
  }
}



export const Graphs = ({children}) => {
  const [vertices, setVerticies] = useState([]);
  const [edges, setEdges] = useState([]);
  const [distances, setDistances] = useState([]);
  
  const startNodeRef = useRef();
  const endNodeRef = useRef();
  const [shortestPath, setshortestPath] = useState();

  const addVertex = (vertex) => {
    setVerticies(vertices => [...vertices, vertex])
  }

  const addEdge = (edge) => {
    setEdges(edges => [...edges, edge])
  }

  const initDistances = (rootNode) => {
    const newDistances = [];

    for (let index = 1; index < vertices.length; index++) {
      const currentNode = vertices[index];
      
      const edge = edges.find(({
        startNode, 
        finishNode
      }) => rootNode === startNode && finishNode === currentNode)
      
      newDistances.push({
        node: currentNode,
        weight: edge ? edge.weight : Infinity,
        path: [rootNode]
      })
      
    }

    setDistances(newDistances)
  }

  const updateDistances = ({visited, minNode, newDistances}) => {
    newDistances.forEach(el => {
      if (visited.includes(el.node)) return 

      const edge = edges.find(({
        startNode, 
        finishNode
      }) => startNode === minNode.node && finishNode === el.node);

      if (!edge) return

      const newWeight = Math.min(el.weight, edge.weight + minNode.weight);
      
      if(newWeight === el.weight) return 
      
      // Если у minNode и у последней ноди в пути один парент. То заменить нужно
      const edge1 = edges.find(({finishNode}) => finishNode === minNode.node)
      const edge2 = edges.find(({finishNode}) => finishNode === el.path[el.path.length-1])

      if(edge1?.startNode === edge2?.startNode) {
        el.path[el.path.length-1] = minNode.node
      } else {
        el.path.push(minNode.node)
      }

      el.weight = newWeight;
    })
  }

  const findAllShortestPaths = (rootNode) => {
    const visited = [rootNode];
    const newDistances = [...distances];
    
    while (visited.length !== vertices.length) {
      const unvisited = newDistances.filter(({node}) => !visited.includes(node));
      const minNode = minBy(unvisited, vertex => vertex.weight);
      
      if (!minNode) {
        break
      }

      visited.push(minNode.node)
        
        updateDistances({
          visited,
          minNode,
          newDistances
        })
    }

    setDistances(newDistances)
  }

  const findShortestPath = (startNode, finishNode) => {
    
    findAllShortestPaths(startNode);
    setshortestPath(distances.find(el => el.node === finishNode))
  }

  // const breathFirstSearch = ({tree, rootNode, searchVal}) => {
  //   const queue = [];
  //   const path = [];
    
  //   queue.push(rootNode)

  //   while(queue.length) {
      
  //     const currentNode = queue[0];
  //     path.push(currentNode.value)

  //     if(currentNode.value == searchVal) return path

  //     if(currentNode.left !== null) queue.push(tree[currentNode.left])
  //     if(currentNode.right !== null) queue.push(tree[currentNode.right])

  //     queue.shift()
  //   }

  //   return path
  // }

  // const startBreathAlgorithm = () => {
  //   const path = breathFirstSearch({
  //     tree,
  //     rootNode: tree["10"],
  //     searchVal: 4
  //   });

  //   // setPath(path)
  // }

  const runDejkstra = () => {
    const start = vertices.find(({value}) => value === startNodeRef.current.value);
    findAllShortestPaths(start);
  }

  const runShortest = () => {
    const start = vertices.find(({value}) => value === startNodeRef.current.value);
    const end = vertices.find(({value}) => value === endNodeRef.current.value);

    findShortestPath(start, end)
  }

  const initGraph = () => {
    const start = vertices.find(({value}) => value === startNodeRef.current.value);
    initDistances(start);
  }
  

  useEffect(() => {
    const vertices = [
      new Vertex('1'),
      new Vertex('2'),
      new Vertex('3'),
      new Vertex('4'),
      new Vertex('5')
    ]
  
    const edges = [
      new Edge(vertices[0], vertices[1], 10),
      new Edge(vertices[0], vertices[3], 30),
      new Edge(vertices[0], vertices[4], 100),
      new Edge(vertices[1], vertices[2], 50),
      new Edge(vertices[2], vertices[4], 10),
      new Edge(vertices[3], vertices[2], 20),
      new Edge(vertices[3], vertices[4], 60),
    ]

    vertices.forEach(verticle => addVertex(verticle))
    edges.forEach(edge => addEdge(edge));

    

    return () => {
      setVerticies([]);
      setEdges([])
    }

  }, [])

  const Path = () => {
    if (shortestPath) {
      return (
        <>
          <p>Shortest path to Vertex: {shortestPath.node.value}</p>
          <p>{shortestPath.path.map(({value}, k) => <b key={k}>{value}{"->"}</b>)}{shortestPath.node.value}</p>
          <p>Weight: {shortestPath.weight}</p>
        </>
      )
    } else {
      return ''
    }
  }

  return (
    <div>
      {children}
      {/* <button onClick={startBreathAlgorithm}>Search</button> */}
      
      <div>
        <p style={{margin: 0}}>Set root node number. Then init grapth</p>
        <input type="text"ref={startNodeRef} />
        <button onClick={initGraph}>Init Graph</button>
      </div>
      <p></p>
      
      <div>
        <span style={{margin: 0}}>Find all shortest paths </span>
        <button onClick={runDejkstra}>Run Dejkstra</button>
      </div>

      <div>
        <span style={{margin: 0}}>Find shortest path to Vertex: </span>
        <input type="text"ref={endNodeRef} />
        <button onClick={runShortest}>Run Dejkstra</button>
        <Path />
      </div>
      
      <br/>
      <br/>
      <p style={{textAlign: "left"}}>All paths from root:</p>
      <ul style={{listStyle: 'none', textAlign: "left"}}>
        {distances.map(({node, weight, path}, i) => {
          return (
            <li key={i}>
              <p>{path.map(({value}, k) => <b key={k}>{value}{"->"}</b>)} <b>{node.value}</b> = {weight}</p>
            </li>
          ) 
        })}
      </ul>
    </div>
  )
}