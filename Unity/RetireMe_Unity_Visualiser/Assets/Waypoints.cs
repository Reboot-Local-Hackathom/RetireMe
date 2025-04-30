using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class Waypoints : MonoBehaviour
{

    public List<Waypoint> waypoints;

    public Waypoint currentWaypointObject;
    public Waypoint maxWaypoint;

    public int currentWaypoint = 0;
    public float minDistanceToWaypoint = 2.0f;
    NavMeshAgent navMeshAgent;

    // Start is called before the first frame update
    void Start()
    {
        navMeshAgent = GetComponent<NavMeshAgent>();
        currentWaypointObject = waypoints[currentWaypoint];
    }

    // Update is called once per frame
    void Update()
    {
        navMeshAgent.SetDestination(currentWaypointObject.transform.position);
        if(Vector3.Distance(transform.position, currentWaypointObject.transform.position) < minDistanceToWaypoint)
        {
            if(currentWaypointObject != maxWaypoint)
            {
                currentWaypoint += 1;
                currentWaypointObject = waypoints[currentWaypoint];
            }
        }

    }
}
