"use client";

import { useEffect } from "react";
import JSZip from "jszip";

const ZipToTextExtractorPage = () => {
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      if (event.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });

    const uploadArea = document.getElementById("uploadArea") as HTMLDivElement;
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const progressContainer = document.getElementById("progressContainer") as HTMLDivElement;
    const progressBar = document.getElementById("progressBar") as HTMLDivElement;
    const progressText = document.getElementById("progressText") as HTMLParagraphElement;
    const resultsContainer = document.getElementById("resultsContainer") as HTMLDivElement;
    const errorContainer = document.getElementById("errorContainer") as HTMLDivElement;
    const errorMessage = document.getElementById("errorMessage") as HTMLParagraphElement;
    const textContent = document.getElementById("textContent") as HTMLPreElement;
    const fileCount = document.getElementById("fileCount") as HTMLSpanElement;
    const characterCount = document.getElementById("characterCount") as HTMLSpanElement;
    const downloadBtn = document.getElementById("downloadBtn") as HTMLButtonElement;
    const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement;

    let extractedText = "";
    let originalFileName = "";

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      uploadArea.classList.add("dragover");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      uploadArea.classList.remove("dragover");
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      uploadArea.classList.remove("dragover");
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    };

    const handleFileSelect = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        processFile(target.files[0]);
      }
    };

    const showError = (message: string) => {
      errorMessage.textContent = message;
      errorContainer.classList.remove("hidden");
      progressContainer.classList.add("hidden");
      resultsContainer.classList.add("hidden");
    };

    const hideError = () => {
      errorContainer.classList.add("hidden");
    };

    const updateProgress = (percent: number, text: string) => {
      progressBar.style.width = `${percent}%`;
      progressText.textContent = text;
    };

    const showProgress = () => {
      hideError();
      progressContainer.classList.remove("hidden");
      resultsContainer.classList.add("hidden");
      updateProgress(0, "Preparing to extract...");
    };

    const hideProgress = () => {
      progressContainer.classList.add("hidden");
    };

    const processFile = async (file: File) => {
      if (!file.name.toLowerCase().endsWith(".zip")) {
        showError("Please select a valid ZIP file.");
        return;
      }

      originalFileName = file.name.replace(".zip", "");
      showProgress();

      try {
        updateProgress(5, `Loading zip file (${(file.size / 1024 / 1024).toFixed(1)}MB)...`);

        const zip = new JSZip();
        const zipContent = await zip.loadAsync(file, { checkCRC32: false });

        updateProgress(20, "Analyzing zip structure...");

        const allFiles = Object.entries(zipContent.files).filter(([, fileData]) => !fileData.dir);
        const totalFiles = allFiles.length;

        updateProgress(25, `Found ${totalFiles} files to process...`);

        let allText = "";
        let processedFiles = 0;
        let totalCharacters = 0;

        for (const [filename, fileData] of allFiles) {
          try {
            const progressPercent = 25 + (processedFiles / totalFiles) * 70;
            updateProgress(progressPercent, `Processing file ${processedFiles + 1}/${totalFiles}: ${filename.length > 50 ? filename.substring(0, 47) + "..." : filename}`);

            const separator = `\n${"=".repeat(80)}\n`;
            const fileHeader = `FILE: ${filename}\n`;
            const headerEnd = `${"=".repeat(80)}\n\n`;

            allText += separator + fileHeader + headerEnd;

            if (isTextFile(filename)) {
              try {
                const content = await fileData.async("string");
                const cleanContent = content.replace(/\0/g, "");
                allText += cleanContent;
                totalCharacters += cleanContent.length;
                if (processedFiles % 10 === 0) {
                  await new Promise((resolve) => setTimeout(resolve, 0));
                }
              } catch (contentError: any) {
                console.error(`Error reading content of ${filename}:`, contentError);
                allText += `[Error reading file content: ${contentError.message}]\n`;
              }
            } else {
              allText += "[Binary file]\n";
            }

            allText += "\n\n";
            processedFiles++;
          } catch (err: any) {
            console.error(`Error processing ${filename}:`, err);
            allText += `[Error processing file: ${err.message}]\n\n`;
            processedFiles++;
          }
        }

        updateProgress(95, "Finalizing extraction...");

        const summary = `ZIP EXTRACTION SUMMARY\n${"=".repeat(80)}\nOriginal file: ${file.name}\nFile size: ${(file.size / 1024 / 1024).toFixed(2)}MB\nTotal files processed: ${processedFiles}\nText files extracted: ${processedFiles}\nTotal characters: ${totalCharacters.toLocaleString()}\nExtraction date: ${new Date().toLocaleString()}\n${"=".repeat(80)}\n\n`;

        extractedText = summary + allText;

        updateProgress(100, "Extraction complete!");
        displayResults(processedFiles, extractedText.length);
      } catch (error: any) {
        console.error("Error processing zip file:", error);
        if (error.message.includes("corrupted")) {
          showError("The zip file appears to be corrupted or damaged.");
        } else if (error.message.includes("password")) {
          showError("Password-protected zip files are not supported.");
        } else {
          showError(`Failed to process the zip file: ${error.message}`);
        }
      }
    };

    const isTextFile = (filename: string) => {
      const textExtensions = [
        ".txt", ".md", ".json", ".xml", ".html", ".htm", ".css", ".js", ".ts",
        ".py", ".java", ".cpp", ".c", ".h", ".php", ".rb", ".go", ".rs", ".swift",
        ".yml", ".yaml", ".ini", ".cfg", ".conf", ".log", ".csv", ".sql", ".sh",
        ".bat", ".ps1", ".dockerfile", ".gitignore", ".readme"
      ];
      const ext = filename.toLowerCase();
      return textExtensions.some((extension) => ext.endsWith(extension)) || !filename.includes(".");
    };

    const displayResults = (fileCountValue: number, charCount: number) => {
      textContent.textContent = extractedText;
      fileCount.textContent = String(fileCountValue);
      characterCount.textContent = charCount.toLocaleString();
      hideProgress();
      resultsContainer.classList.remove("hidden");
    };

    uploadArea.addEventListener("click", () => fileInput.click());
    uploadArea.addEventListener("dragover", handleDragOver);
    uploadArea.addEventListener("dragleave", handleDragLeave);
    uploadArea.addEventListener("drop", handleDrop);
    fileInput.addEventListener("change", handleFileSelect);

    downloadBtn.addEventListener("click", () => {
      const blob = new Blob([extractedText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${originalFileName}_extracted.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(extractedText);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("bg-green-500", "hover:bg-green-600");
        copyBtn.classList.remove("bg-gray-500", "hover:bg-gray-600");
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.classList.remove("bg-green-500", "hover:bg-green-600");
          copyBtn.classList.add("bg-gray-500", "hover:bg-gray-600");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
        showError("Failed to copy text to clipboard.");
      }
    });

    uploadArea.addEventListener("click", () => {
      fileInput.value = "";
    });
  }, []);

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Zip to Text Extractor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload a zip file and extract all text content into a single file
          </p>
        </header>

        <div className="mb-8">
          <div id="uploadArea" className="file-drop-area rounded-lg p-8 text-center cursor-pointer">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Drop your zip file here or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supports zip files of any size - processes systematically
              </p>
            </div>
            <input type="file" id="fileInput" accept=".zip" className="hidden" />
          </div>
        </div>

        <div id="progressContainer" className="mb-8 hidden">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div id="progressBar" className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: "0%" }}></div>
          </div>
          <p id="progressText" className="text-sm text-gray-600 dark:text-gray-400 mt-2">Processing...</p>
        </div>

        <div id="resultsContainer" className="hidden">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Extracted Content</h3>
              <div className="flex space-x-2">
                <button id="downloadBtn" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Download Text File
                </button>
                <button id="copyBtn" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Copy to Clipboard
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded border p-4 max-h-96 overflow-y-auto">
              <pre id="textContent" className="whitespace-pre-wrap text-sm font-mono"></pre>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <span id="fileCount">0</span> files processed • <span id="characterCount">0</span> characters extracted
            </div>
          </div>
        </div>

        <div id="errorContainer" className="hidden">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                <p id="errorMessage" className="text-sm text-red-700 dark:text-red-300 mt-1"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .file-drop-area {
          border: 2px dashed #d1d5db;
          transition: all 0.3s ease;
        }
        .file-drop-area.dragover {
          border-color: #5d5cde;
          background-color: #f3f4f6;
        }
        .dark .file-drop-area.dragover {
          background-color: #374151;
        }
      `}</style>
    </main>
  );
};

export default ZipToTextExtractorPage;

