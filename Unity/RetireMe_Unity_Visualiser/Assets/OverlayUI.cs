using UnityEngine;

public class OverlayUI : MonoBehaviour
{
    public RectTransform uiElement; // The UI element to overlay
    public Transform worldPoint;   // The point in 3D space

    void Update()
    {
        if (uiElement != null && worldPoint != null)
        {
            // Convert the 3D world position to screen space
            Vector3 screenPoint = Camera.main.WorldToScreenPoint(worldPoint.position);

            // Ensure the point is in front of the camera
            if (screenPoint.z > 0)
            {
                // Convert screen space to UI space
                RectTransform canvasRect = uiElement.GetComponentInParent<Canvas>().GetComponent<RectTransform>();
                Vector2 uiPosition;

                bool success = RectTransformUtility.ScreenPointToLocalPointInRectangle(
                    canvasRect,
                    screenPoint,
                    canvasRect.GetComponent<Canvas>().renderMode == RenderMode.ScreenSpaceOverlay ? null : Camera.main,
                    out uiPosition
                );

                if (success)
                {
                    // Dynamically update UI element position
                    uiElement.anchoredPosition = uiPosition;
                }
            }
        }
    }
}
