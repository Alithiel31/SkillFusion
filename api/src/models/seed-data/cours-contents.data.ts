import type { Prisma } from '../../../prisma/generated';

export const coursContentsData: Prisma.CoursContentCreateManyInput[] = [
    // Cours 1: Poser une étagère murale en bois
    {
        content:
            '# Introduction\n\nCe cours présente les bonnes pratiques pour poser une étagère murale en bois de manière droite, stable et durable.',
        numberPage: 1,
        coursId: 1,
    },
    {
        content:
            "# Mesurer et tracer\n\nRepérez l'emplacement de l'étagère, mesurez deux points alignés et marquez-les avec précision avant de percer.",
        numberPage: 2,
        coursId: 1,
    },
    {
        content:
            "# Fixer les supports\n\nChoisissez des chevilles adaptées au type de mur, posez les supports et vérifiez l'horizontalité avec un niveau.",
        numberPage: 3,
        coursId: 1,
    },
    {
        content:
            "# Poser l'étagère\n\nPositionnez votre étagère, serrez les vis et contrôlez la stabilité finale avant d'y déposer des objets.",
        numberPage: 4,
        coursId: 1,
    },
    // Cours 2: Assembler une étagère en kit
    {
        content:
            '# Matériel nécessaire\n\nRassemblez les pièces du kit, les vis et les chevilles fournies.',
        numberPage: 1,
        coursId: 2,
    },
    {
        content:
            '# Assemblage des côtés\n\nFixez les montants latéraux aux étagères avec les vis fournies.',
        numberPage: 2,
        coursId: 2,
    },
    {
        content:
            "# Fixation au mur\n\nPercez les trous et fixez l'étagère au mur avec les chevilles.",
        numberPage: 3,
        coursId: 2,
    },
    {
        content: "# Vérification\n\nTestez la stabilité en appuyant légèrement sur l'étagère.",
        numberPage: 4,
        coursId: 2,
    },
    // Cours 3: Réparer une porte qui grince
    {
        content:
            '# Identifier la cause\n\nLe grincement vient souvent des gonds desserrés ou secs.',
        numberPage: 1,
        coursId: 3,
    },
    {
        content: "# Lubrifier les gonds\n\nAppliquez de l'huile ou du WD-40 sur les pivots.",
        numberPage: 2,
        coursId: 3,
    },
    {
        content: '# Resserrer les vis\n\nSerrez les vis des gonds pour stabiliser la porte.',
        numberPage: 3,
        coursId: 3,
    },
    {
        content: "# Tester\n\nOuvrez et fermez la porte pour vérifier l'absence de bruit.",
        numberPage: 4,
        coursId: 3,
    },
    // Cours 4: Poser du parquet flottant
    {
        content: '# Préparation du sol\n\nAssurez-vous que le sol est propre, sec et plat.',
        numberPage: 1,
        coursId: 4,
    },
    {
        content:
            '# Pose des lames\n\nCommencez par un coin et emboîtez les lames les unes dans les autres.',
        numberPage: 2,
        coursId: 4,
    },
    {
        content: '# Découpe\n\nUtilisez une scie pour ajuster les lames aux dimensions.',
        numberPage: 3,
        coursId: 4,
    },
    {
        content: '# Finition\n\nInstallez les plinthes pour cacher les joints.',
        numberPage: 4,
        coursId: 4,
    },
    // Cours 5: Fabriquer une boîte de rangement
    {
        content: '# Dessin et découpe\n\nDessinez les plans et coupez le bois aux dimensions.',
        numberPage: 1,
        coursId: 5,
    },
    {
        content: '# Assemblage\n\nCollez et vissez les faces de la boîte.',
        numberPage: 2,
        coursId: 5,
    },
    {
        content: '# Ponçage\n\nPoncez les surfaces pour un fini lisse.',
        numberPage: 3,
        coursId: 5,
    },
    {
        content: '# Finition\n\nAppliquez du vernis pour protéger le bois.',
        numberPage: 4,
        coursId: 5,
    },
    // Cours 6: Installer un siphon de lavabo
    {
        content:
            "# Avantages du siphon neuf\n\nUn siphon neuf protège contre les remontées d'odeurs et assure une bonne évacuation des eaux usées.",
        numberPage: 1,
        coursId: 6,
    },
    {
        content:
            "# Préparer la zone\n\nCoupez l'eau, placez un seau et préparez les outils nécessaires avant de démonter l'ancien siphon.",
        numberPage: 2,
        coursId: 6,
    },
    {
        content:
            "# Montage du siphon\n\nAssemblez les joints, serrez à la clé à molette et vérifiez que l'ensemble est bien aligné pour éviter les fuites.",

        numberPage: 3,
        coursId: 6,
    },
    {
        content:
            "# Contrôle final\n\nRouvrez l'eau, observez l'écoulement et vérifiez l'absence de gouttes sous le lavabo.",
        numberPage: 4,
        coursId: 6,
    },
    // Cours 7: Réparer une fuite d'eau
    {
        content:
            "# Localiser la fuite\n\nIdentifiez l'origine de la fuite en observant les traces d'humidité.",
        numberPage: 1,
        coursId: 7,
    },
    {
        content: "# Couper l'eau\n\nFermez la vanne d'arrêt principale pour arrêter l'écoulement.",
        numberPage: 2,
        coursId: 7,
    },
    {
        content: '# Réparer\n\nChangez le joint ou resserrez le raccord défaillant.',
        numberPage: 3,
        coursId: 7,
    },
    {
        content: "# Tester\n\nRouvrez l'eau et vérifiez qu'il n'y a plus de fuite.",
        numberPage: 4,
        coursId: 7,
    },
    // Cours 8: Installer un WC suspendu
    {
        content: '# Préparation\n\nFixez la plaque de fixation au mur et raccordez les eaux.',
        numberPage: 1,
        coursId: 8,
    },
    {
        content: '# Montage\n\nAccrochez le WC sur la plaque et serrez les fixations.',
        numberPage: 2,
        coursId: 8,
    },
    {
        content: "# Raccordements\n\nConnectez les flexibles d'eau et d'évacuation.",
        numberPage: 3,
        coursId: 8,
    },
    {
        content: "# Tests\n\nVérifiez l'étanchéité et le bon fonctionnement.",
        numberPage: 4,
        coursId: 8,
    },
    // Cours 9: Changer un robinet de douche
    {
        content: "# Dépose\n\nCoupez l'eau et démontez l'ancien robinet.",
        numberPage: 1,
        coursId: 9,
    },
    {
        content: '# Préparation\n\nNettoyez les filetages et appliquez du téflon.',
        numberPage: 2,
        coursId: 9,
    },
    {
        content: '# Installation\n\nVissez le nouveau robinet et raccordez les flexibles.',
        numberPage: 3,
        coursId: 9,
    },
    {
        content: "# Vérification\n\nTestez l'ouverture et la fermeture sans fuites.",
        numberPage: 4,
        coursId: 9,
    },
    // Cours 10: Installer une douche
    {
        content: "# Préparation du sol\n\nInstallez le receveur de douche et assurez l'étanchéité.",
        numberPage: 1,
        coursId: 10,
    },
    {
        content: '# Montage des parois\n\nFixez les parois vitrées ou en acrylique.',
        numberPage: 2,
        coursId: 10,
    },
    {
        content: "# Raccordements\n\nConnectez l'arrivée d'eau et l'évacuation.",
        numberPage: 3,
        coursId: 10,
    },
    {
        content: "# Finition\n\nAppliquez les joints silicone pour l'étanchéité.",
        numberPage: 4,
        coursId: 10,
    },
    // Cours 11: Changer un interrupteur simple
    {
        content:
            "# Sécurité électrique\n\nCoupez le courant au tableau avant de toucher tout câble d'interrupteur. Vérifiez l'absence de tension.",
        numberPage: 1,
        coursId: 11,
    },
    {
        content:
            "# Retirer l'interrupteur existant\n\nDévissez la plaque, retirez la carcasse et identifiez les fils à l'aide du schéma simple du circuit.",
        numberPage: 2,
        coursId: 11,
    },
    {
        content:
            "# Poser le nouvel interrupteur\n\nBranchez les fils sur les bornes prévues, fixez l'appareil et reposez la plaque.",
        numberPage: 3,
        coursId: 11,
    },
    {
        content:
            "# Vérification\n\nRemettez le courant, testez l'interrupteur et assurez-vous qu'il fonctionne sans étincelles.",
        numberPage: 4,
        coursId: 11,
    },
    // Cours 12: Installer une prise électrique
    {
        content: "# Préparation\n\nCoupez le courant et percez le mur à l'emplacement choisi.",
        numberPage: 1,
        coursId: 12,
    },
    {
        content: '# Tirage des câbles\n\nTirez les câbles depuis le tableau électrique.',
        numberPage: 2,
        coursId: 12,
    },
    {
        content: "# Montage\n\nFixez la boîte d'encastrement et branchez la prise.",
        numberPage: 3,
        coursId: 12,
    },
    {
        content: '# Tests\n\nRemettez le courant et vérifiez le fonctionnement.',
        numberPage: 4,
        coursId: 12,
    },
    // Cours 13: Changer un fusible
    {
        content: '# Identifier\n\nTrouvez le fusible grillé dans le tableau.',
        numberPage: 1,
        coursId: 13,
    },
    {
        content: '# Retirer\n\nDévissez ou retirez le fusible défaillant.',
        numberPage: 2,
        coursId: 13,
    },
    {
        content: '# Installer\n\nPlacez un fusible neuf de même ampérage.',
        numberPage: 3,
        coursId: 13,
    },
    {
        content: '# Tester\n\nRemettez le courant et vérifiez.',
        numberPage: 4,
        coursId: 13,
    },
    // Cours 14: Changer une ampoule
    {
        content: "# Sécurité\n\nAssurez-vous que l'interrupteur est éteint.",
        numberPage: 1,
        coursId: 14,
    },
    {
        content: "# Dévisser\n\nTournez l'ampoule grillée dans le sens inverse des aiguilles.",
        numberPage: 2,
        coursId: 14,
    },
    {
        content: '# Visser\n\nInstallez la nouvelle ampoule en vissant dans le sens horaire.',
        numberPage: 3,
        coursId: 14,
    },
    {
        content: "# Allumer\n\nTestez en allumant l'interrupteur.",
        numberPage: 4,
        coursId: 14,
    },
    // Cours 15: Installer un détecteur de fumée
    {
        content: "# Choix de l'emplacement\n\nPlacez-le au plafond, loin des sources de vapeur.",
        numberPage: 1,
        coursId: 15,
    },
    {
        content: '# Fixation\n\nVissez la base au plafond.',
        numberPage: 2,
        coursId: 15,
    },
    {
        content: '# Connexion\n\nBranchez les piles ou reliez au circuit si électrique.',
        numberPage: 3,
        coursId: 15,
    },
    {
        content: '# Test\n\nAppuyez sur le bouton de test pour vérifier.',
        numberPage: 4,
        coursId: 15,
    },
    // Cours 16: Purger un radiateur à eau
    {
        content:
            "# Pourquoi purger un radiateur ?\n\nLa purge élimine l'air emprisonné, améliore la circulation d'eau et augmente le confort thermique.",
        numberPage: 1,
        coursId: 16,
    },
    {
        content:
            "# Préparation\n\nPlacez un récipient sous la purge, ouvrez doucement la vanne et laissez l'air s'échapper jusqu'à l'eau.",
        numberPage: 2,
        coursId: 16,
    },
    {
        content:
            '# Refaire la pression\n\nAprès purge, vérifiez la pression de votre installation et remplissez si nécessaire pour maintenir le bon débit.',
        numberPage: 3,
        coursId: 16,
    },
    {
        content:
            '# Entretien\n\nPurger régulièrement prolonge la durée de vie du radiateur et réduit le bruit de la centrale thermique.',
        numberPage: 4,
        coursId: 16,
    },
    // Cours 17: Changer un radiateur
    {
        content: '# Vidange\n\nVidangez le circuit de chauffage.',
        numberPage: 1,
        coursId: 17,
    },
    {
        content: "# Dépose\n\nDémontez l'ancien radiateur.",
        numberPage: 2,
        coursId: 17,
    },
    {
        content: '# Installation\n\nFixez le nouveau radiateur et raccordez-le.',
        numberPage: 3,
        coursId: 17,
    },
    {
        content: '# Purge\n\nRemplissez et purgez le système.',
        numberPage: 4,
        coursId: 17,
    },
    // Cours 18: Nettoyer un conduit de cheminée
    {
        content: '# Préparation\n\nProtégez le sol et rassemblez les outils.',
        numberPage: 1,
        coursId: 18,
    },
    {
        content: '# Nettoyage\n\nUtilisez une brosse pour retirer la suie.',
        numberPage: 2,
        coursId: 18,
    },
    {
        content: '# Aspiration\n\nAspirez les dépôts tombés.',
        numberPage: 3,
        coursId: 18,
    },
    {
        content: "# Vérification\n\nInspectez l'état du conduit.",
        numberPage: 4,
        coursId: 18,
    },
    // Cours 19: Installer un thermostat programmable
    {
        content: '# Choix\n\nSélectionnez un thermostat compatible.',
        numberPage: 1,
        coursId: 19,
    },
    {
        content: "# Dépose\n\nRetirez l'ancien thermostat.",
        numberPage: 2,
        coursId: 19,
    },
    {
        content: '# Installation\n\nFixez et câblez le nouveau.',
        numberPage: 3,
        coursId: 19,
    },
    {
        content: '# Programmation\n\nConfigurez les horaires.',
        numberPage: 4,
        coursId: 19,
    },
    // Cours 20: Isoler un mur intérieur
    {
        content: '# Préparation\n\nNettoyez et préparez le mur.',
        numberPage: 1,
        coursId: 20,
    },
    {
        content: "# Pose de l'isolant\n\nFixez les panneaux isolants.",
        numberPage: 2,
        coursId: 20,
    },
    {
        content: "# Finition\n\nRecouvrez d'un parement.",
        numberPage: 3,
        coursId: 20,
    },
    {
        content: "# Vérification\n\nTestez l'isolation thermique.",
        numberPage: 4,
        coursId: 20,
    },
    // Cours 21: Poser une faïence murale
    {
        content:
            '# Préparer le mur\n\nNettoyez et dégraissez la surface, rebouchez les trous et appliquez un primaire si nécessaire.',
        numberPage: 1,
        coursId: 21,
    },
    {
        content:
            '# Étaler le mortier-colle\n\nUtilisez une spatule crantée pour répartir le mortier-colle de manière homogène sur le mur.',
        numberPage: 2,
        coursId: 21,
    },
    {
        content:
            '# Poser la faïence\n\nCommencez par la première rangée, appuyez bien et laissez des joints réguliers entre les carreaux.',
        numberPage: 3,
        coursId: 21,
    },
    {
        content:
            '# Réaliser les joints\n\nAprès séchage, lissez les joints et nettoyez les excès pour une finition propre.',
        numberPage: 4,
        coursId: 21,
    },
    // Cours 22: Poser du carrelage au sol
    {
        content: '# Préparation du sol\n\nNivelez et nettoyez la surface.',
        numberPage: 1,
        coursId: 22,
    },
    {
        content: '# Mortier\n\nÉtalez le mortier-colle.',
        numberPage: 2,
        coursId: 22,
    },
    {
        content: '# Pose\n\nPlacez les carreaux et alignez-les.',
        numberPage: 3,
        coursId: 22,
    },
    {
        content: '# Joints\n\nAppliquez les joints après séchage.',
        numberPage: 4,
        coursId: 22,
    },
    // Cours 23: Réparer une fissure dans le carrelage
    {
        content: '# Nettoyer\n\nDégraissez la fissure.',
        numberPage: 1,
        coursId: 23,
    },
    {
        content: '# Remplir\n\nAppliquez du mastic adapté.',
        numberPage: 2,
        coursId: 23,
    },
    {
        content: '# Lisser\n\nNivelez le mastic.',
        numberPage: 3,
        coursId: 23,
    },
    {
        content: '# Sécher\n\nLaissez sécher et nettoyez.',
        numberPage: 4,
        coursId: 23,
    },
    // Cours 24: Poser une moquette
    {
        content: '# Préparation\n\nNettoyez et nivelez le sol.',
        numberPage: 1,
        coursId: 24,
    },
    {
        content: '# Découpe\n\nCoupez la moquette aux dimensions.',
        numberPage: 2,
        coursId: 24,
    },
    {
        content: '# Fixation\n\nCollez ou agrafez la moquette.',
        numberPage: 3,
        coursId: 24,
    },
    {
        content: '# Finition\n\nInstallez les plinthes.',
        numberPage: 4,
        coursId: 24,
    },
    // Cours 25: Changer un carreau de carrelage
    {
        content: "# Retirer\n\nCassez et retirez l'ancien carreau.",
        numberPage: 1,
        coursId: 25,
    },
    {
        content: '# Préparer\n\nNettoyez la surface.',
        numberPage: 2,
        coursId: 25,
    },
    {
        content: '# Poser\n\nAppliquez le mortier et posez le nouveau.',
        numberPage: 3,
        coursId: 25,
    },
    {
        content: '# Joints\n\nFaites les joints.',
        numberPage: 4,
        coursId: 25,
    },
    // Cours 26: Préparer et peindre un mur
    {
        content:
            '# Préparer la surface\n\nPoncer les irrégularités, dépoussiérer et masquer les zones à protéger avant application.',
        numberPage: 1,
        coursId: 26,
    },
    {
        content:
            '# Appliquer la sous-couche\n\nLa sous-couche permet une meilleure adhérence et une uniformité de la peinture finale.',
        numberPage: 2,
        coursId: 26,
    },
    {
        content:
            '# Peindre au rouleau\n\nTravaillez par bandes verticales et croisez les passes pour éviter les traces.',
        numberPage: 3,
        coursId: 26,
    },
    {
        content:
            "# Finitions\n\nReprenez les angles au pinceau et vérifiez l'homogénéité du mur après séchage.",
        numberPage: 4,
        coursId: 26,
    },
    // Cours 27: Poser du papier peint
    {
        content: '# Préparation\n\nNettoyez et lissez le mur.',
        numberPage: 1,
        coursId: 27,
    },
    {
        content: '# Encollage\n\nAppliquez la colle sur le papier.',
        numberPage: 2,
        coursId: 27,
    },
    {
        content: '# Pose\n\nCollez le papier en lissant pour éviter les bulles.',
        numberPage: 3,
        coursId: 27,
    },
    {
        content: '# Découpe\n\nCoupez les excès autour des angles.',
        numberPage: 4,
        coursId: 27,
    },
    // Cours 28: Peindre une porte
    {
        content: '# Poncer\n\nPoncez la porte pour un fini lisse.',
        numberPage: 1,
        coursId: 28,
    },
    {
        content: '# Masquer\n\nProtégez les parties non à peindre.',
        numberPage: 2,
        coursId: 28,
    },
    {
        content: '# Peindre\n\nAppliquez la peinture en couches fines.',
        numberPage: 3,
        coursId: 28,
    },
    {
        content: '# Sécher\n\nLaissez sécher et retirez le masking.',
        numberPage: 4,
        coursId: 28,
    },
    // Cours 29: Appliquer une peinture décorative
    {
        content: '# Base\n\nAppliquez une couche de base.',
        numberPage: 1,
        coursId: 29,
    },
    {
        content: '# Technique\n\nUtilisez la technique choisie (effet, texture).',
        numberPage: 2,
        coursId: 29,
    },
    {
        content: '# Application\n\nAppliquez la peinture décorative.',
        numberPage: 3,
        coursId: 29,
    },
    {
        content: '# Finition\n\nLissez et laissez sécher.',
        numberPage: 4,
        coursId: 29,
    },
    // Cours 30: Peindre un plafond
    {
        content: '# Préparation\n\nProtégez le sol et les meubles.',
        numberPage: 1,
        coursId: 30,
    },
    {
        content: '# Masquage\n\nMasquez les bords.',
        numberPage: 2,
        coursId: 30,
    },
    {
        content: '# Peinture\n\nUtilisez un rouleau adapté pour plafonds.',
        numberPage: 3,
        coursId: 30,
    },
    {
        content: '# Nettoyage\n\nNettoyez les coulures immédiatement.',
        numberPage: 4,
        coursId: 30,
    },
];
