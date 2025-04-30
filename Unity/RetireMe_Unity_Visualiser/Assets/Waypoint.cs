using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Waypoint : MonoBehaviour
{
    public string percentString = "10%";
    public float pitchModulation = 0.0f;

    Canvas canvas;

    public GameObject percentTextPrefab;

    // Start is called before the first frame update
    void Start()
    {
        canvas = FindObjectOfType<Canvas>();
    }

    private void OnTriggerEnter(Collider other)
    {
        if(other.transform.root.GetComponent<AvatarMarker>() != null)
        {
            GameObject percentText = Instantiate(percentTextPrefab, canvas.transform);
            percentText.GetComponent<OverlayUI>().worldPoint = transform;
            percentText.GetComponent<Text>().text = percentString;
            percentText.GetComponent<OverlayUI>().uiElement = percentText.GetComponent<RectTransform>();
            percentText.GetComponent<AudioSource>().pitch = 1.0f + pitchModulation;
            percentText.GetComponent<AudioSource>().Play();
        }
    }
}
