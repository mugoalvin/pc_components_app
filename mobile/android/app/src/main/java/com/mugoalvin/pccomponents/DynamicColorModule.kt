package com.yourapp;

import android.app.Activity;
import android.os.Build;
import android.graphics.Color;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import com.facebook.react.bridge.*;

import com.google.android.material.color.DynamicColors;
import com.google.android.material.color.MaterialColors;

public class DynamicColorModule extends ReactContextBaseJavaModule {

    public DynamicColorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "DynamicColorModule";
    }

    @ReactMethod
    public void getDynamicColors(Promise promise) {
        WritableMap colorMap = Arguments.createMap();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            Activity activity = getCurrentActivity();
            if (activity != null) {
                int primary = MaterialColors.getColor(activity, com.google.android.material.R.attr.colorPrimary, Color.BLACK);
                int secondary = MaterialColors.getColor(activity, com.google.android.material.R.attr.colorSecondary, Color.GRAY);

                colorMap.putString("primary", String.format("#%06X", (0xFFFFFF & primary)));
                colorMap.putString("secondary", String.format("#%06X", (0xFFFFFF & secondary)));
                promise.resolve(colorMap);
                return;
            }
        }

        colorMap.putString("primary", "#6200EE");  // fallback
        colorMap.putString("secondary", "#03DAC5");
        promise.resolve(colorMap);
    }
}