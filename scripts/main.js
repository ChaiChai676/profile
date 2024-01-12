/* Code blocks */

const codeContents = {
'qnn-example':
`

`,
'nr-2-1':
`
UENUM(BlueprintType)
enum class EGearCategory : uint8
{
    None,
    Backpack,
    Costume,
    Flashlight,
    Footwear,
    Vision,
    Miscellaneous,
};

UENUM(BlueprintType)
enum class EDegradationType : uint8
{
    None,
    Durability,
    Charge,
};

USTRUCT(BlueprintType)
struct FGearData : public FTableRowBase
{
    GENERATED_BODY()
    
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    FString Name;   
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    EGearCategory GearCategory;
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    FString Description;    
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    FName BoneName;
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    UStaticMesh* Mesh;
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    float Cost;
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    UTexture2D* ItemImage;
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    EDegradationType DegradationType;
    UPROPERTY(EditAnywhere, BlueprintReadOnly)
    int DegradationValue;
};`,
'nr-2-2':
`
`,
'qnn-1-1':
`
  void AGrapplingArm::InputBind(AQNNPlayerCharacter* Character)
  {
    if (Character)
    {
      if (AQNNPlayerController* PlayerController = Cast<AQNNPlayerController>(Character->GetController()))
      {
        if (UEnhancedInputLocalPlayerSubsystem* Subsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(PlayerController->GetLocalPlayer()))
        {
          Subsystem->AddMappingContext(GrapplingContext, 0);
          if (UQNNEnhancedInputComponent* QNNEnhancedInputComponent = Cast<UQNNEnhancedInputComponent>(Character->InputComponent))
          {
            const FQNNGameplayTags& GameplayTags = FQNNGameplayTags::Get();
            
            QNNEnhancedInputComponent->BindActionByTag(PlayerController->InputConfig, GameplayTags.InputTag_Grappling_Launch, ETriggerEvent::Started, this, &AGrapplingArm::LaunchGrapple);
            QNNEnhancedInputComponent->BindActionByTag(PlayerController->InputConfig, GameplayTags.InputTag_Grappling_Cancel, ETriggerEvent::Started, this, &AGrapplingArm::CancelGrapple);
          }
        }
      }
    }
  }
}`,
'qnn-1-2':
`
void AGrapplingArm::InputUnbind(AQNNPlayerCharacter* Character)
{
    if (Character)
    {
        if (APlayerController* PlayerController = Cast<APlayerController>(Character->GetController()))
        {
            if (UEnhancedInputLocalPlayerSubsystem* Subsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(PlayerController->GetLocalPlayer()))
            {
                Subsystem->RemoveMappingContext(GrapplingContext);
                if (UEnhancedInputComponent* EnhancedInputComponent = Cast<UEnhancedInputComponent>(Character->InputComponent))
                {
                    EnhancedInputComponent->ClearBindingsForObject(this);
                }
            }
        }
    }
}`,
'qnn-2':
`

`,
'qnn-3':
`
  void UQNNMovementComponent::BeginPlay()
  {
    Super::BeginPlay();

    Duration = FMath::Clamp(Duration, 0.2f, 9000.0f);
    if (GetOwner())
    {
      StartLocation = GetOwner()->GetActorLocation();
      StartRotation = GetOwner()->GetActorRotation();
    }

    // When bLoop = false, prevents movement on BeginPlay
    if (Switch)
    {
      bMCActivated = Switch->bSwitchActivated;
    }
  }

  void UQNNMovementComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
  {
    Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

    if (Switch)
    {
      if (bMCActivated != Switch->bSwitchActivated)
      {
        bSwitchToggled = true;
      }
      bMCActivated = Switch->bSwitchActivated;
    }
    
    if (bLoop)
    {
      if (bMCActivated)
      {
        Move(DeltaTime);

        if (TimePassed > Duration)
        {
          TimePassed = 0;
          if (bForward)
          {
            bForward = false;
          }
          else
          {
            bForward = true;
          }
        }
      }
    } else
    {
      if (bSwitchToggled)
      {
        Move(DeltaTime);
        
        if (TimePassed > Duration)
        {
          TimePassed = 0;
          if (bForward)
          {
            bForward = false;
          }
          else
          {
            bForward = true;
          }
          bSwitchToggled = false;
        }
      }
    }
  }

  void UQNNMovementComponent::Move(float DeltaTime)
  {
    if (GetOwner())
    {
      TimePassed += DeltaTime;
      const float TimeRatio = FMath::Clamp(TimePassed/Duration, 0.0f, 1.0f);
      if (bForward)
      {
        CurrentLocation = FMath::Lerp(StartLocation, StartLocation+RelativeLocation, TimeRatio);
        CurrentRotation = FMath::Lerp(StartRotation, StartRotation+RelativeRotation, TimeRatio);
      }
      else
      {
        CurrentLocation = FMath::Lerp(StartLocation+RelativeLocation, StartLocation, TimeRatio);
        CurrentRotation = FMath::Lerp(StartRotation+RelativeRotation, StartRotation, TimeRatio);
      }
      
      GetOwner()->SetActorLocation(CurrentLocation);
      GetOwner()->SetActorRotation(CurrentRotation);
    }
  }
`,
'qnn-4':
`

`
    // ... add more snippets as needed
};

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.code-container').forEach(container => {
        let id = container.getAttribute('data-id');
        let codeContent = codeContents[id];

        if (codeContent) {
            container.querySelector('code').textContent = codeContent;
        } else {
            console.error(`No code content found for ID: ${id}`);
        }
    });
});

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        let codeContent = this.previousElementSibling.querySelector('code').textContent;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = codeContent;
        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        /*alert('Code copied to clipboard!');*/
    });
});

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        let codeContent = this.previousElementSibling.querySelector('code').textContent;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = codeContent;
        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        // Change the button text
        this.textContent = 'Copied!';

        // Optionally, you can revert the button text back after a few seconds:
        setTimeout(() => {
            this.textContent = 'Copy';
        }, 2000); // Reverts back to 'Copy' after 2 seconds
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();
});
