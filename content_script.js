var focusedElementIndex = -1;
var elements = [];
var currentSpeechUtterance = null;
var isEnabled = true;
var isShortcutEnabled = true;

chrome.storage.sync.get("isEnabled", function (data) {
  isEnabled = data.isEnabled === undefined ? true : data.isEnabled;
  if (!isEnabled) {
    stopOverride();
  }
});

chrome.storage.sync.get("isShortcutEnabled", function (data) {
  isShortcutEnabled =
    data.isShortcutEnabled === undefined ? true : data.isShortcutEnabled;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.isEnabled !== undefined) {
    isEnabled = request.isEnabled;
    chrome.storage.sync.set({ isEnabled: isEnabled });
    if (!isEnabled) {
      stopOverride();
    }
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.isShortcutEnabled !== undefined) {
    isShortcutEnabled = request.isShortcutEnabled;
    chrome.storage.sync.set({ isShortcutEnabled: isShortcutEnabled });
  }
});

function getVisibleElements() {
  if (isEnabled) {
    elements = Array.from(
      document.querySelectorAll("*:not(script):not(style)")
    ).filter(function (element) {
      var style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    });
  }
}

function focusNextElement() {
  if (isEnabled) {
    if (elements.length > 0) {
      focusedElementIndex = (focusedElementIndex + 1) % elements.length;
      highlightFocusedElement();
      speakFocusedElement();
    }
  }
}

function highlightFocusedElement() {
  if (isEnabled) {
    elements.forEach(function (element) {
      element.style.boxShadow = ""; 
      element.style.outline = ""; 
    });

    if (focusedElementIndex >= 0 && focusedElementIndex < elements.length) {
      var focusedElement = elements[focusedElementIndex];
      focusedElement.style.boxShadow = "0 0 8px 4px rgba(191, 165, 0, 0.4)";
      focusedElement.style.outline = "3px solid orange";
      focusedElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

function speakFocusedElement() {
  if (isEnabled) {
    if (focusedElementIndex >= 0 && focusedElementIndex < elements.length) {
      var focusedElement = elements[focusedElementIndex];
      var tag = focusedElement.tagName;
      var text = focusedElement.innerText;
      var ariaLabel = focusedElement.getAttribute("aria-label");
      var id = focusedElement.id;

      var spokenText = "";

      switch (tag) {
        case "!--":
          spokenText = "Comment";
          break;
        case "!DOCTYPE":
          spokenText = "Document Type";
          break;
        case "A":
          spokenText = "Link";
          var linkText = focusedElement.textContent.trim();
          var href = focusedElement.getAttribute("href");
          if (linkText) {
            spokenText += ", " + linkText;
          }
          if (ariaLabel) {
            spokenText += ", Aria Label: " + ariaLabel;
          }
          if (href) {
            spokenText += ", Click to be redirected";
          }
          break;
        case "ABBR":
          spokenText = "Abbreviation";
          break;
        case "ACRONYM":
          spokenText = "Acronym";
          break;
        case "ADDRESS":
          spokenText = "Contact Information";
          break;
        case "APPLET":
          spokenText = "Embedded Applet";
          break;
        case "AREA":
          spokenText = "Image Map Area";
          break;
        case "ARTICLE":
          spokenText = "Article";
          break;
        case "ASIDE":
          spokenText = "Aside Content";
          break;
        case "AUDIO":
          spokenText = "Audio";
          break;
        case "B":
          spokenText = "Bold Text";
          break;
        case "BASE":
          spokenText = "Base URL";
          break;
        case "BASEFONT":
          spokenText = "Default Font";
          break;
        case "BDI":
          spokenText = "Bidirectional Text";
          break;
        case "BDO":
          spokenText = "Text Direction Override";
          break;
        case "BIG":
          spokenText = "Big Text";
          break;
        case "BLOCKQUOTE":
          spokenText = "Block Quote";
          break;
        case "BODY":
          spokenText = "Document Body";
          break;
        case "BR":
          spokenText = "Line Break";
          break;
        case "BUTTON":
          spokenText = "Button";
          break;
        case "CANVAS":
          spokenText = "Canvas";
          break;
        case "CAPTION":
          spokenText = "Table Caption";
          break;
        case "CENTER":
          spokenText = "Centered Text";
          break;
        case "CITE":
          spokenText = "Work Title";
          break;
        case "CODE":
          spokenText = "Computer Code";
          break;
        case "COL":
          spokenText = "Table Column";
          break;
        case "COLGROUP":
          spokenText = "Table Column Group";
          break;
        case "DATA":
          spokenText = "Machine-Readable Translation";
          break;
        case "DATALIST":
          spokenText = "Pre-defined Options";
          break;
        case "DD":
          spokenText = "Description Value";
          break;
        case "DEL":
          spokenText = "Deleted Text";
          break;
        case "DETAILS":
          spokenText = "Additional Details";
          break;
        case "DFN":
          spokenText = "Term to be Defined";
          break;
        case "DIALOG":
          spokenText = "Dialog Box";
          break;
        case "DIR":
          spokenText = "Directory List";
          break;
        case "DIV":
          spokenText = "Divider Section";
          break;
        case "DL":
          spokenText = "Description List";
          break;
        case "DT":
          spokenText = "Term/Name";
          break;
        case "EM":
          spokenText = "Emphasized Text";
          break;
        case "EMBED":
          spokenText = "Embedded Content";
          break;
        case "FIELDSET":
          spokenText = "Form Fieldset";
          break;
        case "FIGCAPTION":
          spokenText = "Figure Caption";
          break;
        case "FIGURE":
          spokenText = "Figure";
          break;
        case "FONT":
          spokenText = "Font Style";
          break;
        case "FOOTER":
          spokenText = "Footer";
          break;
        case "FORM":
          spokenText = "Form";
          break;
        case "FRAME":
          spokenText = "Frame";
          break;
        case "FRAMESET":
          spokenText = "Frameset";
          break;
        case "H1":
          spokenText = "Heading 1";
          break;
        case "H2":
          spokenText = "Heading 2";
          break;
        case "H3":
          spokenText = "Heading 3";
          break;
        case "H4":
          spokenText = "Heading 4";
          break;
        case "H5":
          spokenText = "Heading 5";
          break;
        case "H6":
          spokenText = "Heading 6";
          break;
        case "HEAD":
          spokenText = "Document Head";
          break;
        case "HEADER":
          spokenText = "Header";
          break;
        case "HR":
          spokenText = "Horizontal Rule";
          break;
        case "HTML":
          spokenText = "HTML Root";
          break;
        case "I":
          spokenText = "Alternate Voice/Mood Text";
          break;
        case "IFRAME":
          spokenText = "Inline Frame";
          break;
        case "IMG":
          spokenText = "Image";
          var altText = focusedElement.getAttribute("alt");
          if (altText) {
            spokenText += ", Alt Text: " + altText;
          } else {
            spokenText += ", No Image Alt Text";
          }
          break;
        case "INPUT":
          spokenText = "Input Control";
          break;
        case "INS":
          spokenText = "Inserted Text";
          break;
        case "KBD":
          spokenText = "Keyboard Input";
          break;
        case "LABEL":
          spokenText = "Label";
          break;
        case "LEGEND":
          spokenText = "Fieldset Caption";
          break;
        case "LI":
          spokenText = "List Item";
          break;
        case "LINK":
          spokenText = "Resource Link";
          break;
        case "MAIN":
          spokenText = "Main Content";
          break;
        case "MAP":
          spokenText = "Image Map";
          break;
        case "MARK":
          spokenText = "Highlighted Text";
          break;
        case "META":
          spokenText = "Metadata";
          break;
        case "METER":
          spokenText = "Measurement Gauge";
          break;
        case "NAV":
          spokenText = "Navigation Bar";
          break;
        case "NOFRAMES":
          spokenText = "Alternate Content for Non-supporting Frames";
          break;
        case "NOSCRIPT":
          spokenText = "Alternate Content for Non-supporting Scripts";
          break;
        case "OBJECT":
          spokenText = "Embedded Object";
          break;
        case "OL":
          spokenText = "Ordered List";
          break;
        case "OPTGROUP":
          spokenText = "Option Group";
          break;
        case "OPTION":
          spokenText = "Option";
          break;
        case "OUTPUT":
          spokenText = "Calculation Result";
          break;
        case "P":
          spokenText = "Paragraph";
          break;
        case "PARAM":
          spokenText = "Object Parameter";
          break;
        case "PICTURE":
          spokenText = "Picture Container";
          break;
        case "PRE":
          spokenText = "Preformatted Text";
          break;
        case "PROGRESS":
          spokenText = "Task Progress";
          break;
        case "Q":
          spokenText = "Quotation";
          break;
        case "RP":
          spokenText = "Ruby Annotation Fallback";
          break;
        case "RT":
          spokenText = "Ruby Annotation";
          break;
        case "RUBY":
          spokenText = "Ruby Annotation Container";
          break;
        case "S":
          spokenText = "Strikethrough Text";
          break;
        case "SAMP":
          spokenText = "Sample Output";
          break;
        case "SCRIPT":
          spokenText = "Script";
          break;
        case "SECTION":
          spokenText = "Section";
          break;
        case "SELECT":
          spokenText = "Drop-down List";
          break;
        case "SMALL":
          spokenText = "Smaller Text";
          break;
        case "SOURCE":
          spokenText = "Media Source";
          break;
        case "SPAN":
          spokenText = "Inline Section";
          break;
        case "STRIKE":
          spokenText = "Strikethrough Text";
          break;
        case "STRONG":
          spokenText = "Important Text";
          break;
        case "STYLE":
          spokenText = "Style Information";
          break;
        case "SUB":
          spokenText = "Subscript Text";
          break;
        case "SUMMARY":
          spokenText = "Details Summary";
          break;
        case "SUP":
          spokenText = "Superscript Text";
          break;
        case "SVG":
          spokenText = "SVG Graphics";
          break;
        case "TABLE":
          spokenText = "Table";
          break;
        case "TBODY":
          spokenText = "Table Body";
          break;
        case "TD":
          spokenText = "Table Cell";
          break;
        case "TEMPLATE":
          spokenText = "Hidden Content Template";
          break;
        case "TEXTAREA":
          spokenText = "Multiline Text Input";
          break;
        case "TFOOT":
          spokenText = "Table Footer";
          break;
        case "TH":
          spokenText = "Table Header Cell";
          break;
        case "THEAD":
          spokenText = "Table Header";
          break;
        case "TIME":
          spokenText = "Specific Time";
          break;
        case "TITLE":
          spokenText = "Document Title";
          break;
        case "TR":
          spokenText = "Table Row";
          break;
        case "TRACK":
          spokenText = "Text Track";
          break;
        case "TT":
          spokenText = "Teletype Text";
          break;
        case "U":
          spokenText = "Unarticulated Text";
          break;
        case "UL":
          spokenText = "Unordered List";
          break;
        case "VAR":
          spokenText = "Variable";
          break;
        case "VIDEO":
          spokenText = "Video";
          break;
        case "WBR":
          spokenText = "Possible Line Break";
          break;
        default:
          spokenText = tag;
      }

      if (text && text.trim() !== "" && tag !== "A") {
        spokenText += ", " + text;
      }

      if (ariaLabel && tag !== "A") {
        spokenText += ", Aria Label: " + ariaLabel;
      }
      //   if (id) {
      //     spokenText += ", ID: " + id;
      //   }

      stopSpeaking();
      speakText(spokenText);
    }
  }
}

function stopOverride() {
  if (currentSpeechUtterance) {
    speechSynthesis.cancel();
    currentSpeechUtterance = null;
  }

  elements.forEach(function (element) {
    element.style.boxShadow = "";
    element.style.outline = "";
  });
}

function stopSpeaking() {
  if (isEnabled) {
    if (currentSpeechUtterance) {
      speechSynthesis.cancel();
      currentSpeechUtterance = null;
    }
  }
}

function speakText(text) {
  if (isEnabled) {
    var utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    currentSpeechUtterance = utterance;
  }
}

function speakMetaDescription() {
  if (isEnabled) {
    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      var descriptionContent = metaDescription.getAttribute("content");
      if (descriptionContent) {
        var spokenText = "Website Description: " + descriptionContent;
        speakText(spokenText);
      } else {
        speakText("No Website Description");
      }
    } else {
      speakText("No Website Description");
    }
  }
}

// Enable Keyboard Accessibility Shortcut for On-Off Button
document.addEventListener("keydown", function (event) {
  if (
    event.ctrlKey &&
    event.key === "z" &&
    event.key === "b" &&
    isShortcutEnabled
  ) {
    if (isEnabled) {
      stopOverride();
    }
    isEnabled = !isEnabled;
    chrome.storage.sync.set({ isEnabled: isEnabled });
  }
});

// Enable Keyboard Accessibility Features
document.addEventListener("keydown", function (event) {
  if (event.key === "Tab" && isShortcutEnabled) {
    if (isEnabled) {
      event.preventDefault();
    }
    focusNextElement();
  } else if (event.shiftKey && isShortcutEnabled) {
    if (isEnabled) {
      event.preventDefault();
    }
    stopSpeaking();
  } else if (event.key === "Alt" && isShortcutEnabled) {
    if (isEnabled) {
      event.preventDefault();
    }
    stopSpeaking();
    speakMetaDescription();
  }
});

// Focus on elements with mousedown
document.addEventListener("mousedown", function (event) {
  var clickedElement = event.target;
  var clickedElementIndex = elements.indexOf(clickedElement);
  if (clickedElementIndex >= 0) {
    focusedElementIndex = clickedElementIndex;
    highlightFocusedElement();
    speakFocusedElement();
  }
});

getVisibleElements();
focusNextElement();

// Stop speech when the focused element changes
document.addEventListener("focusin", function (event) {
  stopSpeaking();
});

// Recheck visibility when the page is scrolled
window.addEventListener("scroll", function () {
  getVisibleElements();
});

// Stop speech when navigating away from the page
window.addEventListener("beforeunload", function () {
  stopSpeaking();
});
